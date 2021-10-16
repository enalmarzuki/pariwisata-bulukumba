import React, {useCallback, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {
  actionGetDetailPesananUser,
  actionUploadPayment,
} from '../../redux/action/pesananUser';
import {actionGetRoom} from '../../redux/action/kamar';
import {actionGetDetailPenginapan} from '../../redux/action/penginapan';
import NumberFormat from 'react-number-format';

export default function KonfirmasiPembayaran({route, navigation}) {
  const dispatch = useDispatch();
  const detailPesanan = useSelector(state => state.pesananUser.detailPesanan);
  const roomData = useSelector(state => state.kamar.dataKamar);
  const penginapan = useSelector(
    state => state.penginapan.dataDetailPenginapan,
  );

  // console.log('detailPesanan', detailPesanan);
  // console.log('roomData', roomData);
  // console.log('penginapan', penginapan);
  const [form, setForm] = useForm({
    nama: '',
    bank: '',
    norek: '',
    foto: '',
  });

  const getImage = () => {
    launchImageLibrary(
      {quality: 0.5, maxWidth: 200, maxHeight: 200},
      response => {
        console.log('response', response);
        if (response.didCancel || response.error) {
          showMessage({
            message: 'oops, sepertinya anda tidak memilih foto',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
        } else {
          // console.log('response', response);
          setForm('foto', response?.assets[0]);
        }
      },
    );
  };

  const handleClickConfirmPayment = async () => {
    console.log(form);
    console.log(detailPesanan);

    // const newData = FormData();
    // newData.append('nama', form.nama);
    // newData.append('bank', form.bank);
    // newData.append('norek', form.norek);
    // newData.append('foto', {
    //   uri: form.foto.uri,
    //   name: form.foto.fileName,
    //   type: form.foto.type,
    // });

    const response = await dispatch(
      actionUploadPayment(detailPesanan._id, form),
    );
    console.log('response', response);
    // navigation.push('ProsesPembayaran')
  };

  const getDetailPesananUser = useCallback(async () => {
    return dispatch(actionGetDetailPesananUser(route.params.idPesanan));
  }, [dispatch, route.params.idPesanan]);

  const getDetailKamar = useCallback(async () => {
    return dispatch(actionGetRoom(detailPesanan.id_kamar));
  }, [dispatch, detailPesanan.id_kamar]);

  const getDetailPenginapan = useCallback(async () => {
    return dispatch(actionGetDetailPenginapan(roomData.idPenginapan));
  }, [dispatch, roomData.idPenginapan]);

  useEffect(() => {
    getDetailPesananUser();
    getDetailKamar();
    getDetailPenginapan();
  }, [getDetailPesananUser, getDetailKamar, getDetailPenginapan]);

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
                <Text style={styles.cardBodySubTitle}>{detailPesanan._id}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardBodyTitle}>Nama Penginapan</Text>
                <Text style={styles.cardBodySubTitle}>{penginapan.nama}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.cardBodyTitle}>Tipe Kamar</Text>
                <Text style={styles.cardBodySubTitle}>{roomData.tipe}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterTitle}>Total Harga</Text>
              <Text style={styles.cardFooterSubTitle}>
                <NumberFormat
                  value={detailPesanan.total}
                  displayType={'text'}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={'Rp. '}
                  renderText={value => <Text>{value}</Text>}
                />
              </Text>
            </View>
          </View>
          <View style={styles.border} />
          <View>
            <SectionTitle title="Informasi Pengirim" />
            <Gap height={10} />
            <Input
              label="Nama Lengkap"
              value={form.nama}
              onChangeText={value => setForm('nama', value)}
            />
            <Input
              label="Asal Bank"
              value={form.bank}
              onChangeText={value => setForm('bank', value)}
            />
            <Input
              label="Nomor Rekening"
              value={form.norek}
              onChangeText={value => setForm('norek', value)}
            />
            <Input
              label="Bukti Pembayaran"
              value={form.foto.fileName}
              onChangeText={value => setForm('foto', value)}
              onFocus={() => getImage()}
            />
          </View>
        </View>
      </ScrollView>
      <Gap height={20} />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnWrapper}
        onPress={handleClickConfirmPayment}>
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
