import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {fonts} from '../../../utils';

const Button = ({type, title, onPress, icon, disable}) => {
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor: type === 'secondary' ? '#eeeeee' : '#98ddca',
    paddingVertical: 10,
    borderRadius: 100,
  }),
  text: type => ({
    fontSize: 18,
    fontFamily: fonts.primary[700],
    textAlign: 'center',
    color: type === 'secondary' ? 'gray' : 'black',
  }),
});
