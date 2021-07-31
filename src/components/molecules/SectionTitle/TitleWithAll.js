import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function TitleWithAll({title, onPress}) {
  return (
    <View style={styles.titleSectionWrapper}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.subTitle}>Lihat Semua</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleSectionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.primary[800],
    fontSize: 18,
    color: colors.text.primary,
  },
  subTitle: {
    fontFamily: fonts.primary[800],
    fontSize: 12,
    color: colors.text.secondary,
  },
});
