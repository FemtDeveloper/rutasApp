import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const BlackButton = ({title, onPress, style}: Props) => {
  return (
    <TouchableOpacity
      style={{...(style as any), ...styles.blackButton}}
      activeOpacity={0.8}
      onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    backgroundColor: 'black',
    height: 50,
    width: 150,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    elevation: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
