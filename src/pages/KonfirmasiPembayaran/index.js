import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SectionTitle, Input, Gap} from '../../components';
import {colors, fonts, useForm} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';

export default function KonfirmasiPembayaran({navigation}) {
  const [form, setForm] = useForm({
    namaLengkap: '',
    asalBank: '',
    noRekening: '',
    buktiPembayaran: '',
  });

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200},
      response => {
        console.log('response', response);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'oops, sepertinya anda tidak memili foto nya ?',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          console.log('response', response);
          setForm('buktiPembayaran', response?.assets[0]?.uri);
        }
      },
    );
  };

  console.log(form);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.sectionWrapper}>
          <Text style={styles.titleSection}>Konfirmasi Pembayaran</Text>
          <View style={styles.cardWrapper}>
            <View>
              <View style={styles.cardHeader}>
                <SectionTitle title="Detail Transaksi" />
                <Text style={styles.cardHeaderSubtitle}>Senin, 25/08/2021</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardBodyTitle}>Id Transaksi</Text>
                <Text style={styles.cardBodySubTitle}>00012534322</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardBodyTitle}>Nama Penginapan</Text>
                <Text style={styles.cardBodySubTitle}>Villa Samata</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardBodyTitle}>Tipe Kamar</Text>
                <Text style={styles.cardBodySubTitle}>Kamar Keluarga</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterTitle}>Total Harga</Text>
              <Text style={styles.cardFooterSubTitle}>Rp. 660.000</Text>
            </View>
          </View>
          <View style={styles.border} />
          <View>
            <SectionTitle title="Informasi Pengirim" />
            <Gap height={10} />
            <Input
              label="Nama Lengkap"
              value={form.namaLengap}
              onChangeText={value => setForm('namaLengap', value)}
            />
            <Input
              label="Asal Bank"
              value={form.asalBank}
              onChangeText={value => setForm('asalBank', value)}
            />
            <Input
              label="Nomor Rekening"
              value={form.noRekening}
              onChangeText={value => setForm('noRekening', value)}
            />
            <Input
              label="Bukti Pembayaran"
              value={form.buktiPembayaran}
              onChangeText={value => setForm('buktiPembayaran', value)}
              onFocus={() => getImage()}
            />
          </View>
        </View>
      </ScrollView>
      <Gap height={20} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnWrapper}
        onPress={() => navigation.push('ProsesPembayaran')}>
        <Text style={styles.btnTitle}>Konfirmasi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.container,
    flex: 1,
  },
  sectionWrapper: {
    backgroundColor: colors.container,
    padding: 30,
    flex: 1,
  },
  titleSection: {
    fontFamily: fonts.primary[800],
    fontSize: 24,
    color: colors.text.primary,
    marginBottom: 35,
  },
  cardWrapper: {
    height: 265,
    backgroundColor: colors.cardLight,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardHeaderSubtitle: {
    fontFamily: fonts.primary.normal,
    fontSize: 12,
    color: colors.text.subTitle,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardBodyTitle: {
    flex: 1,
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.text.subTitle,
  },
  cardBodySubTitle: {
    flex: 1,
    fontFamily: fonts.primary[700],
    fontSize: 16,
    color: colors.text.primary,
  },
  cardFooter: {
    backgroundColor: colors.primary,
    marginHorizontal: -20,
    marginVertical: -30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooterTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 16,
    color: colors.white,
  },
  cardFooterSubTitle: {
    fontFamily: fonts.primary[700],
    fontSize: 24,
    color: colors.white,
  },
  border: {
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: colors.border,
    marginHorizontal: -30,
    marginBottom: 30,
  },
  btnWrapper: {
    backgroundColor: colors.primary,
    position: 'relative',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 25,
  },
  btnTitle: {
    fontFamily: fonts.primary[700],
    fontSize: 18,
    color: colors.white,
  },
});
