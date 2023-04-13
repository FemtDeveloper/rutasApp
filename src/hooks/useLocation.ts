import Geolocation from '@react-native-community/geolocation';
import {useEffect, useRef, useState} from 'react';
import {Location} from '../interfaces/appInterfaces';

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [routeLine, setRouteLine] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const watchRef = useRef<number>();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    getCurrentLocation().then(location => {
      if (!isMounted.current) {
        return;
      }
      setInitialPosition(location);
      setUserLocation(location);
      setRouteLine(prev => [...prev, location]);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  const followUserLocation = () => {
    watchRef.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) {
          return;
        }
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
        setRouteLine(prev => [...prev, location]);
      },
      err => console.error({err}),
      {enableHighAccuracy: true, distanceFilter: 10},
    );
  };

  const stopFollowUserLocation = () => {
    Geolocation.clearWatch(watchRef.current!);
  };

  return {
    hasLocation,
    initialPosition,
    userLocation,
    routeLine,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  };
};
