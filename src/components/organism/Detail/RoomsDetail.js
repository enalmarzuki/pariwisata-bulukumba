import moment from 'moment';
// import 'moment/locale/id';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ICAc, ICKulkas, ICMaps, ICTv, ICWifi} from '../../../assets';
import {colors, fonts, useForm} from '../../../utils';
import {Gap, Input} from '../../atoms';
import {Header, SectionTitle, Loading} from '../../molecules';
import NumberFormat from 'react-number-format';
import {useDispatch, useSelector} from 'react-redux';
import {actionBookingRoom} from '../../../redux/action/kamar';

const icon = type => {
  if (type.toLowerCase() === 'kulkas') {
    return <ICKulkas />;
  } else if (type.toLowerCase() === 'ac') {
    return <ICAc />;
  }
  return <ICWifi />;
};

export default function RoomsDetail({navigation, data}) {
  const user = useSelector(state => state.auth.dataUser);
  const isLoadingBooking = useSelector(state => state.kamar.isLoading);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useForm({
    id_kamar: data._id,
    harga: data.harga,
    id_pemesan: user.id,
    namaLengap: '',
    noHp: '',
    masuk: '',
    keluar: '',
  });
  const dispatch = useDispatch();

  console.log('total', total);

  const updateData = (e, target) => {
    const date = moment(e).format('DD MMMM YYYY');

    if (target === 'keluar') {
      const checkInDate = moment(new Date(form.masuk)).format('x');
      const checkOutDate = moment(e).format('x');

      if (checkOutDate < checkInDate) {
        return showMessage({
          message: 'Ooops! Ada yang salah dari tanggal keluar anda',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        const checkIn = moment(new Date(form.masuk));
        const checkOut = moment(e);

        const difference = checkOut.diff(checkIn, 'days');
        const totalBooking = form.harga * difference;

        setTotal(totalBooking);
        return setForm(target, date);
      }
    } else {
      return setForm(target, date);
    }
  };

  // const howLongToStay = (masuk, keluar) => {
  //   const checkIn = masuk.split(' ');
  //   const checkOut = keluar.split(' ');

  //   const result = checkOut[0] - checkIn[0] + 1;

  //   return result;
  // };

  const handleClickBooking = async () => {
    const dataBooking = {
      id_kamar: data._id,
      harga: data.harga,
      id_pemesan: user.id,
      masuk: moment(form.masuk, 'DD MMMM YYYY').format('DD-MM-YYYY'),
      keluar: moment(form.keluar, 'DD MMMM YYYY').format('DD-MM-YYYY'),
      total: total,
    };

    console.log('dataBooking', dataBooking);

    const response = await dispatch(actionBookingRoom(dataBooking));
    console.log('response', response);
    if (response.success) {
      return navigation.replace('MetodePembayaran');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          isJustBtnBack
          icColor="#000000"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: `https://skripsi-wulan.herokuapp.com/image/${data.foto}`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.titleWrapper}>
            <View>
              <Text style={styles.title}>{data.tipe}</Text>
              <Text style={styles.subTitle}>
                <NumberFormat
                  value={data.harga}
                  displayType={'text'}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp. "
                  suffix=" / Malam"
                  renderText={value => <Text>{value}</Text>}
                />
              </Text>
            </View>
          </View>
          <View>
            <SectionTitle title="Fasilitas" />

            <View style={styles.facilityWrapper}>
              {data.fasilitas?.map((item, index) => (
                <View style={styles.facility} key={index}>
                  {icon(item)}
                  <Text style={styles.facilityDesc}>{item}</Text>
                </View>
              ))}
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
                value={form.masuk}
                onChangeText={e => updateData(e, 'masuk')}
              />
              <Gap width={25} />
              <Input
                type="date"
                label="Tanggal Keluar"
                value={form.keluar}
                onChangeText={e => updateData(e, 'keluar')}
              />
            </View>
            {/* <Text>{`Anda akan menginap ${howLongToStay(
              form.tglMasuk,
              form.tglKeluar,
            )} hari`}</Text> */}
          </View>
        </View>
        <Gap height={25} />
      </ScrollView>
      <View style={styles.totalWrapper}>
        <View style={styles.totalDesc}>
          <Text style={styles.totalTitle}>Total Harga</Text>
          <Text style={styles.total}>
            <NumberFormat
              value={total}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
              prefix={'Rp. '}
              renderText={value => <Text>{value}</Text>}
            />
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnBayar}
          onPress={handleClickBooking}>
          <Text style={styles.textBtn}>Booking</Text>
        </TouchableOpacity>
      </View>
      {isLoadingBooking && <Loading />}
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
    // justifyContent: 'space-between',
    marginTop: 15,
  },
  facility: {
    alignItems: 'center',
    marginRight: 35,
  },
  facilityDesc: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.text.subTitle,
    marginTop: 14,
    textTransform: 'capitalize',
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
