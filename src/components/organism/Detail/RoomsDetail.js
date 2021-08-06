import moment from 'moment';
import 'moment/locale/id';
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
import {ICAc, ICKulkas, ICMaps, ICTv, ICWifi} from '../../../assets';
import {colors, fonts, useForm} from '../../../utils';
import {Gap, Input} from '../../atoms';
import {Header, SectionTitle} from '../../molecules';

export default function RoomsDetail({navigation, image}) {
  const [form, setForm] = useForm({
    namaLengap: '',
    noHp: '',
    tglMasuk: '',
    tglKeluar: '',
  });

  const updateData = (e, target) => {
    const date = moment(e).format('DD MMMM YYYY');
    setForm(target, date);
  };

  console.log(form);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          isJustBtnBack
          icColor="#000000"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.imageWrapper}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.titleWrapper}>
            <View>
              <Text style={styles.title}>Kamar Reguler</Text>
              <Text style={styles.subTitle}>Rp. 180.000 / Malam</Text>
            </View>
            <ICMaps />
          </View>
          <View>
            <SectionTitle title="Fasilitas" />
            <View style={styles.facilityWrapper}>
              <View style={styles.facility}>
                <ICWifi />
                <Text style={styles.facilityDesc}>Wi-Fi</Text>
              </View>
              <View style={styles.facility}>
                <ICTv />
                <Text style={styles.facilityDesc}>Televisi</Text>
              </View>
              <View style={styles.facility}>
                <ICAc />
                <Text style={styles.facilityDesc}>AC</Text>
              </View>
              <View style={styles.facility}>
                <ICKulkas />
                <Text style={styles.facilityDesc}>Kulkas</Text>
              </View>
            </View>
          </View>
          <Gap height={25} />
          <SectionTitle title="Booking Kamar" />
          <View>
            <Input
              data={form}
              label="Nama Lengkap"
              value={form.namaLengap}
              onChangeText={value => setForm('namaLengap', value)}
            />
            <Input
              data={form}
              label="No. Hp"
              value={form.noHp}
              keyboardType="phone-pad"
              onChangeText={value => setForm('noHp', value)}
            />
            <View style={styles.inputDateWrapper}>
              <Input
                type="date"
                label="Tanggal Masuk"
                value={form.tglMasuk}
                onChangeText={e => updateData(e, 'tglMasuk')}
              />
              <Gap width={25} />
              <Input
                type="date"
                label="Tanggal Keluar"
                value={form.tglKeluar}
                onChangeText={e => updateData(e, 'tglKeluar')}
              />
            </View>
          </View>
        </View>
        <Gap height={25} />
      </ScrollView>
      <View style={styles.totalWrapper}>
        <View style={styles.totalDesc}>
          <Text style={styles.totalTitle}>Total Harga</Text>
          <Text style={styles.total}>Rp. 660.000</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} style={styles.btnBayar}>
          <Text style={styles.textBtn}>Bayar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.container,
    flex: 1,
  },
  sectionWrapper: {
    paddingHorizontal: 30,
  },
  imageWrapper: {
    width: '100%',
    height: 466,
    overflow: 'hidden',
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  image: {
    width: '100%',
    height: 466,
  },
  titleWrapper: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 19,
    borderRadius: 10,
    position: 'relative',
    top: -40,
    shadowColor: '#ACB4BC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontFamily: fonts.primary[800],
    fontSize: 16,
    color: colors.text.primary,
  },
  subTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 12,
    color: colors.text.subTitle,
    marginTop: 3,
  },
  facilityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  facility: {
    alignItems: 'center',
  },
  facilityDesc: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.text.subTitle,
    marginTop: 14,
  },
  inputDateWrapper: {
    flexDirection: 'row',
  },
  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalDesc: {
    flex: 2,
    backgroundColor: colors.totalBackground,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  totalTitle: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.white,
    marginBottom: 5,
  },
  total: {
    fontFamily: fonts.primary[800],
    fontSize: 20,
    color: colors.text.primary,
  },
  btnBayar: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtn: {
    fontFamily: fonts.primary[700],
    fontSize: 20,
    color: colors.white,
  },
});
