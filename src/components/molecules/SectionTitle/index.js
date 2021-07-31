import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import TitleWithAll from './TitleWithAll';

export default function index({title, subTitle, onPress, withSeeAll}) {
  if (withSeeAll) {
    return <TitleWithAll title={title} onPress={onPress} />;
  }
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.primary[800],
    fontSize: 18,
    color: colors.text.primary,
  },
});
