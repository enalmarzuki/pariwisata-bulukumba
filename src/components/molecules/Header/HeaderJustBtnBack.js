import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICArrow} from '../../../assets';
import {colors} from '../../../utils';

export default function HeaderJustBtnBack({onPress, icColor}) {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.bgBtnBack}>
        <TouchableOpacity onPress={() => onPress()}>
          <ICArrow color={icColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    zIndex: 2,
    padding: 30,
  },
  bgBtnBack: {
    backgroundColor: colors.button.bgBtnBack,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.white,
    padding: 12,
    alignSelf: 'flex-start',
  },
});
