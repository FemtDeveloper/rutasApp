import React, {createContext, useState, useEffect} from 'react';
import {Platform, AppState} from 'react-native';

import {
  PermissionStatus,
  check,
  request,
  PERMISSIONS,
  openSettings,
} from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};
export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    // if infinite loading
    checkLocationPermission();
    AppState.addEventListener('change', state => {
      if (state === 'inactive') return;
      checkLocationPermission();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    if (permissions.locationStatus === 'blocked') {
      openSettings();
    }

    setPermissions({...permissions, locationStatus: permissionStatus});
    console.log(permissionStatus);
  };
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    setPermissions({...permissions, locationStatus: permissionStatus});
    console.log(permissionStatus);
  };

  return (
    <PermissionsContext.Provider
      value={{permissions, askLocationPermission, checkLocationPermission}}>
      {children}
    </PermissionsContext.Provider>
  );
};
