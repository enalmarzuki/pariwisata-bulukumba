import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors} from '../../../utils';

export default function InputTime({
  onChangeText,
  label,
  value,
  onFocus,
  onBlur,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, date) => {
    if (date === undefined) {
      return null;
    }
    const selectedTime = moment(date).format('HH:mm');
    setDate(date);
    setShowDatePicker(false);
    return onChangeText(selectedTime);
  };

  console.log('datesssssss', date);
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onFocus={() => setShowDatePicker(true)}
        onBlur={() => setShowDatePicker(false)}
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
      {showDatePicker && (
        <RNDateTimePicker
          mode="time"
          value={date}
          onChange={onChange}
          is24Hour={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputFormLogin: {
    paddingHorizontal: 0,
    flex: 1,
  },
});
