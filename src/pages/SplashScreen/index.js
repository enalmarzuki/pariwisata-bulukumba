import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ILLogo} from '../../assets';
import {fonts} from '../../utils';
import {IMGLogoBulkum} from '../../assets';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStarted');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <View style={styles.page}>
        <Image source={IMGLogoBulkum} style={styles.logo} />
        <Text style={styles.title}>Agenda Pariwisata</Text>
      </View>
      <Text style={styles.subTitle}>Supported by Bulukumba</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    // backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    // color: colors.text.primary,
    marginTop: 16,
  },
  subTitle: {
    position: 'absolute',
    bottom: 20,
    color: '#000',
  },
  logo: {
    width: 95,
    height: 110,
  },
});
