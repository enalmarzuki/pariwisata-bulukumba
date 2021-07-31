import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ILLogo} from '../../assets';
import {fonts} from '../../utils';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Agenda Pariwisata</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    // backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    // color: colors.text.primary,
    marginTop: 5,
  },
});
