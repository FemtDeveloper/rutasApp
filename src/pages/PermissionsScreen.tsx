import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import // check,
// PERMISSIONS,
// PermissionStatus,
// request,
'react-native-permissions';
import {PermissionsContext} from '../context/PermissionsContext';
import {BlackButton} from '../components/BlackButton';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text>PermissionsScreen</Text>
      <BlackButton title="Permiso" onPress={askLocationPermission} />

      <Text>{JSON.stringify(permissions, null, 4)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
