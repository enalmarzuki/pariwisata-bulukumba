import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICCalendar, ICLocation} from '../../../assets';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title === 'Pariwisata') {
      return active ? <ICLocation /> : <ICLocation />;
    }
    if (title === 'Agenda') {
      return active ? <ICCalendar /> : <ICCalendar />;
    }

    return <ICLocation />;
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={styles.text(active)}>
        <Icon />
      </View>
    </TouchableOpacity>
  );
};

export default TabItem;

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
