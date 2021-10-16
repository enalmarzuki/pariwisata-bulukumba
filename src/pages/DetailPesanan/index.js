import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {IMGKamar1} from '../../assets';

const index = () => {
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
            <View style={styles.pemesanan1}>
              <Text style={styles.nama1}>Nama</Text>
              <Text style={styles.nama2}>Jhone Doe</Text>
            </View>
            <View style={styles.pemesanan2}>
              <Text style={styles.tipe1}>Tipe Kamar</Text>
              <Text style={styles.tipe2}>Reguler</Text>
            </View>
            <View style={styles.pemesanan3}>
              <Text style={styles.jadwal1}>Masuk</Text>
              <Text style={styles.jadwal2}>21 Maret 2021</Text>
            </View>
            <View style={styles.pemesanan4}>
              <Text style={styles.jadwal3}>Keluar </Text>
              <Text style={styles.jadwal4}>21 Maret 2021</Text>
            </View>
            <View style={styles.pembungkus2}>
              <Text style={styles.total1}>Total</Text>
              <Text style={styles.total2}>660. 0000</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
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
  tipe1: {
    fontSize: 16,
    color: '#8A8A8A',
  },
  tipe2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jadwal1: {
    fontSize: 16,
    color: '#8A8A8A',
  },
  jadwal2: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jadwal3: {
    fontSize: 16,
    color: '#8A8A8A',
  },
  jadwal4: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pembungkus: {
    paddingHorizontal: 30,
    marginVertical: 8,
  },
  pemesanan1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pemesanan2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pemesanan3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pemesanan4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  total1: {
    fontSize: 16,
    color: '#8A8A8A',
  },
  total2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  pembungkus2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 17,
  },
});
