import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';

const TopTabItem = ({title, active, onPress, onLongPress}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        onLongPress={onLongPress}>
        <View style={styles.text(active)}>
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TopTabItem;

const styles = StyleSheet.create({
  container: {alignItems: 'center'},
  text: active => ({
    backgroundColor: active ? '#C5EAE1' : 'transparent',
    height: 53,
    width: 53,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
