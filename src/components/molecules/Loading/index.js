import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,
    backgroundColor: colors.loadingBackground,
  },
  text: {
    fontFamily: fonts.primary[600],
    fontSize: 18,
    color: colors.white,
    marginTop: 16,
  },
});
