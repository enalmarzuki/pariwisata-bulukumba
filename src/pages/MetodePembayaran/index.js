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
import {ILPayment, IMGLogoBca} from '../../assets';
import {colors, fonts} from '../../utils';

export default function index({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Metode Pembayaran</Text>
          <View style={styles.imageWrapper}>
            <Image source={ILPayment} style={styles.image} />
          </View>
          <Text style={styles.subTitle}>Rekening yang tersedia</Text>
          <View style={styles.subTitleContent}>
            <View style={styles.imageLogoWrapper}>
              <Image source={IMGLogoBca} style={styles.imageLogo} />
            </View>
            <View style={styles.logoText}>
              <Text style={styles.text}>Jhone Doe</Text>
              <Text style={styles.text}>1900237524286</Text>
              <Text style={styles.text}>Bank BCA</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnAction('secondary')}>
          <Text style={styles.btnText('secondary')}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.btnAction()}>
          <Text style={styles.btnText()}>Konfirmasi</Text>
        </TouchableOpacity>
      </View>
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
    height: 400,
    overflow: 'hidden',
    marginTop: 40,
  },
  image: {
    width: '100%',
    height: 400,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  subTitle: {
    fontFamily: fonts.primary[700],
    fontSize: 20,
    color: colors.text.primary,
    marginTop: 55,
  },
  subTitleContent: {
    flexDirection: 'row',
    marginTop: 25,
    alignItems: 'center',
  },
  imageLogoWrapper: {
    height: 100,
    overflow: 'hidden',
    marginRight: 30,
  },
  imageLogo: {
    height: 100,
    width: 130,
  },
  logoText: {
    flex: 1,
  },
  text: {
    fontFamily: fonts.primary[700],
    fontSize: 20,
    color: colors.text.primary,
    marginBottom: 4,
  },
  btnAction: btn => ({
    flex: 1,
    paddingVertical: 24,
    backgroundColor:
      btn === 'secondary'
        ? colors.button.secondary.background
        : colors.button.primary.background,
  }),
  btnText: btn => ({
    fontFamily: fonts.primary[700],
    fontSize: 18,
    textAlign: 'center',
    color:
      btn === 'secondary'
        ? colors.button.secondary.text
        : colors.button.primary.text,
  }),
});
