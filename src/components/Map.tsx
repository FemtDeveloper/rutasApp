import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {useLocation} from '../hooks/useLocation';
import {LoadingScreen} from '../pages/LoadingScreen';
import {Fab} from './Fab';

export const Map = () => {
  const [showPolilyne, setShowPolilyne] = useState(false);
  const {
    hasLocation,
    initialPosition,
    userLocation,
    routeLine,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) {
      return;
    }
    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({center: {latitude, longitude}});

    return () => {};
  }, [userLocation]);

  const centerPosition = async () => {
    const {longitude, latitude} = await getCurrentLocation();

    following.current = true;

    mapViewRef.current?.animateCamera({center: {latitude, longitude}});
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        showsUserLocation
        style={styles.map}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchStart={() => (following.current = false)}>
        <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="Título"
          description="Esto es una descripción"
          style={styles.marker}
        />
      </MapView>
      {showPolilyne && <Polyline coordinates={routeLine} />}
      <Fab
        iconName="star-outline"
        onPress={centerPosition}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{position: 'absolute', bottom: 40, right: 40}}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolilyne(prev => !prev)}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{position: 'absolute', bottom: 80, right: 40}}
      />
    </>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
