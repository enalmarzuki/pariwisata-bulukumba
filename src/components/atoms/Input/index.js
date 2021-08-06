import React from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../../../utils';
import InputDate from './InputDate';

export default function Input({
  type,
  onChangeText,
  label,
  value,
  isSecure,
  keyboardType,
  onFocus,
  onBlur,
}) {
  if (type === 'date') {
    return (
      <InputDate
        onChangeText={onChangeText}
        label={label}
        value={value}
        // onFocus={onFocus}
      />
    );
  }
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      onBlur={onBlur}
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
