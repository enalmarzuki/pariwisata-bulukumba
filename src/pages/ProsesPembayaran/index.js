import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ILPaymentProcess} from '../../assets';
import {colors, fonts} from '../../utils';

export default function index({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Pembayaran</Text>
          <Text style={styles.title}>Sedang Di Proses</Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image source={ILPaymentProcess} style={styles.image} />
        </View>
        <Text style={styles.desc}>
          Pembayaran anda sedang di proses, kami akan menghubungi anda lewat
          telpon, pastikan nomor anda aktif dalam 2 x 24 jam.
        </Text>
        <Text style={styles.desc}>Terima Kasih.</Text>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnWrapper}
        onPress={() => navigation.replace('MainApp')}>
        <Text style={styles.btnTitle}>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.container,
    flex: 1,
    padding: 30,
  },
  title: {
    fontFamily: fonts.primary[900],
    fontSize: 24,
    color: colors.text.primary,
    textAlign: 'center',
  },
  imageWrapper: {
    overflow: 'hidden',
    height: 500,
    marginTop: 35,
  },
  image: {
    height: 500,
    width: '100%',
  },
  desc: {
    fontFamily: fonts.primary.normal,
    fontSize: 20,
    color: colors.text.subTitle,
    textAlign: 'center',
    lineHeight: 30,
    marginTop: 35,
  },
  btnWrapper: {
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingVertical: 25,
  },
  btnTitle: {
    fontFamily: fonts.primary[700],
    fontSize: 18,
    color: colors.white,
  },
});
