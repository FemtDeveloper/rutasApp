import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  iconName: string;
}

export const Fab = ({iconName, onPress, style = {}}: Props) => {
  return (
    <View style={{...(style as any)}}>
      <TouchableOpacity onPress={onPress} style={styles.blackButton}>
        <Icon name={iconName} size={35} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  blackButton: {
    color: 'white',
    height: 40,
    width: 40,
    zIndex: 9999,
  },
});
