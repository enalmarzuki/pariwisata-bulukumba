import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../../../utils';

export default function Input({
  onChangeText,
  label,
  value,
  isSecure,
  keyboardType,
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isSecure}
      keyboardType={keyboardType || 'default'}
      label={label}
      underlineColor={colors.textInputUnderline}
      style={styles.inputFormLogin}
      theme={{
        colors: {
          background: 'transparent',
          primary: colors.primary,
          text: colors.text.primary,
          placeholder: value ? colors.primary : colors.text.primary,
        },
      }}
    />
  );
}

const styles = StyleSheet.create({
  inputFormLogin: {
    paddingHorizontal: 0,
    flex: 1,
  },
});
