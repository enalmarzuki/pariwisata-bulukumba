import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICArrow} from '../../../assets';
import {colors, fonts} from '../../../utils';
import HeaderJustBtnBack from './HeaderJustBtnBack';
import HeaderWithAvatar from './HeaderWithAvatar';

export default function index({
  onPress,
  title,
  image,
  icColor,
  withAvatar,
  isJustBtnBack,
}) {
  if (withAvatar) {
    return (
      <HeaderWithAvatar
        onPress={onPress}
        title={title}
        image={image}
        icColor={icColor}
      />
    );
  }

  if (isJustBtnBack) {
    return <HeaderJustBtnBack icColor={icColor} onPress={onPress} />;
  }

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity onPress={() => onPress()}>
        <ICArrow color={icColor} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.primary[800],
    fontSize: 20,
    color: colors.text.primary,
    textAlign: 'center',
    flex: 1,
  },
});
