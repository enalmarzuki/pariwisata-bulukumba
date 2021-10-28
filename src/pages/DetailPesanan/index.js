import axios from 'axios';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Lightbox from 'react-native-lightbox-v2';
import NumberFormat from 'react-number-format';
import {IMGBuktiTF, IMGKamar1} from '../../assets';
import {Loading} from '../../components';
import {Gap} from '../../components/atoms';
import {fonts} from '../../utils';
import {showError, showSucces} from '../../utils/showMessage';

const DetailPesanan = ({route, navigation}) => {
  const {params} = route;
  const [isLoading, setIsLoading] = useState(false);

  console.log('params', params);

  const handleClickKonfirmasi = status => {
    console.log('status', status);
    setIsLoading(true);
    axios
      .post(
        `https://skripsi-wulan.herokuapp.com/pesanan/konfir/${params.dataPenginapan._id}`,
        {status: status},
      )
      .then(res => {
        setIsLoading(false);
        if (res.data.diagnostic.konfirmasi === 'setuju') {
          return showSucces('Pesanan di setujui');
        }
        return showError('Pesanan di tolak');
      })
      .catch(err => {
        setIsLoading(false);
        showError('Somethings wrong');
        console.log('err', err);
      });
  };

  return (
    <View>
      <ScrollView>
        <View>
          <View style={styles.kamarWrapper}>
            <Image
              style={styles.kamar}
              source={{
                uri: `${params.dataPenginapan.kamar.foto}`,
              }}
            />
          </View>
          <View style={styles.hargaWrapper}>
            <Text style={styles.namakamar}>
              {params.dataPenginapan.kamar.tipe}
            </Text>
            <NumberFormat
              value={params.dataPenginapan.kamar.harga}
              displayType={'text'}
              thousandSeparator="."
              decimalSeparator=","
              prefix="Rp. "
              suffix=" / Malam"
              renderText={value => (
                <Text style={styles.hargakamar}>{value}</Text>
              )}
            />
          </View>
          <View>
            <Text style={styles.informasiWrapper}> Informasi Pemesan</Text>
          </View>

          <View style={styles.pembungkus}>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Nama</Text>
              <Text style={styles.nama2}>{params.dataPenginapan.pemesan}</Text>
            </View>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Tipe Kamar</Text>
              <Text style={styles.nama2}>
                {params.dataPenginapan.kamar.tipe}
              </Text>
            </View>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Masuk</Text>
              <Text style={styles.nama2}>{params.dataPenginapan.masuk}</Text>
            </View>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Keluar </Text>
              <Text style={styles.nama2}>{params.dataPenginapan.keluar}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.informasiWrapper}> Informasi Pengirim</Text>
          </View>

          <View style={styles.pembungkus}>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Nama</Text>
              <Text style={styles.nama2}>
                {params.dataPenginapan.bukti_pembayaran?.nama}
              </Text>
            </View>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Nomor Rekening</Text>
              <Text style={styles.nama2}>
                {params.dataPenginapan.bukti_pembayaran?.norek}
              </Text>
            </View>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Bank</Text>
              <Text style={styles.nama2}>
                {params.dataPenginapan.bukti_pembayaran?.bank}
              </Text>
            </View>

            <Gap height={60} />
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Total</Text>
              <NumberFormat
                isNumericString
                value={params.dataPenginapan.total}
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                prefix="Rp. "
                renderText={value => (
                  <Text style={styles.hargakamar2}>{value}</Text>
                )}
              />
            </View>

            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Bukti Pembayaran</Text>

              <Lightbox
                activeProps={{
                  style: {
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                  },
                  resizeMode: 'contain',
                }}
                backgroundColor="#00000070">
                <Image
                  style={styles.imgBuktiTFWrapper}
                  resizeMode="cover"
                  source={{
                    uri: `${params.dataPenginapan.bukti_pembayaran.foto}`,
                  }}
                />
              </Lightbox>
            </View>
          </View>
        </View>
        <Gap height={60} />
        <View style={styles.btnKonfirmasiWrapper}>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnKonfirmasi('secondary')}
              onPress={() => handleClickKonfirmasi('tolak')}>
              <Text style={styles.btnKonfirmasiText}>Tolak</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnKonfirmasi('')}
              onPress={() => handleClickKonfirmasi('setuju')}>
              <Text style={styles.btnKonfirmasiText}>Setuju</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
};

export default DetailPesanan;

const styles = StyleSheet.create({
  btnKonfirmasiWrapper: {
    flexDirection: 'row',
  },
  btnWrapper: {
    flex: 1,
  },
  btnKonfirmasi: type => ({
    flex: 1,
    backgroundColor: type === 'secondary' ? '#D1D3D4' : '#7DE1C9',
    padding: 24,
    color: 'white',
  }),
  btnKonfirmasiText: {
    color: 'white',
    fontFamily: fonts.primary[800],
    fontSize: 20,
    textAlign: 'center',
  },
  imgBuktiTFWrapper: {
    backgroundColor: 'red',
    width: 150,
    height: 150,
  },
  imgBuktiTF: {
    width: '100%',
    height: '100%',
  },
  kamar: {
    height: 466,
    width: '100%',
  },
  kamarWrapper: {
    borderBottomEndRadius: 20,
    overflow: 'hidden',
    borderBottomStartRadius: 20,
  },
  hargaWrapper: {
    marginHorizontal: 30,
    marginTop: -30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
  },
  namakamar: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hargakamar: {
    fontSize: 12,
    color: '#000',
    marginTop: 5,
  },
  hargakamar2: {
    color: '#000',
    marginTop: 5,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  informasiWrapper: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    marginVertical: 25,
  },
  nama1: {
    fontSize: 16,
    color: '#8A8A8A',
  },
  nama2: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  pembungkus: {
    paddingHorizontal: 30,
    marginVertical: 8,
  },
  pemesanan: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  total2: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  pembungkus2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 17,
  },
  contain: {
    flex: 1,
    height: 150,
  },
});
