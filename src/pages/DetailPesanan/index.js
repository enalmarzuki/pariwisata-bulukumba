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
import {IMGBuktiTF, IMGKamar1} from '../../assets';
import {Gap} from '../../components/atoms';
import {fonts} from '../../utils';

const index = ({navigator}) => {
  return (
    <View>
      <ScrollView>
        <View>
          <View style={styles.kamarWrapper}>
            <Image style={styles.kamar} source={IMGKamar1} />
          </View>
          <View style={styles.hargaWrapper}>
            <Text style={styles.namakamar}>Kamar Reguler</Text>
            <Text style={styles.hargakamar}>Rp. 220. 000 / Malam</Text>
          </View>
          <View>
            <Text style={styles.informasiWrapper}> Informasi Pemesan</Text>
          </View>
          <View style={styles.pembungkus}>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Nama</Text>
              <Text style={styles.nama2}>Jhone Doe</Text>
            </View>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Tipe Kamar</Text>
              <Text style={styles.nama2}>Reguler</Text>
            </View>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Masuk</Text>
              <Text style={styles.nama2}>21 Maret 2021</Text>
            </View>
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Keluar </Text>
              <Text style={styles.nama2}>21 Maret 2021</Text>
            </View>
            <Gap height={60} />
            <View style={styles.pemesanan}>
              <Text style={styles.nama1}>Total</Text>
              <Text style={styles.total2}>660. 0000</Text>
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
                  source={IMGBuktiTF}
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
              style={styles.btnKonfirmasi('secondary')}>
              <Text style={styles.btnKonfirmasiText}>Tolak</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnKonfirmasi('')}>
              <Text style={styles.btnKonfirmasiText}>Setuju</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

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
    color: '#BDBDBD',
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
