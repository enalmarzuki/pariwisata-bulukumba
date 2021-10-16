/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useRef} from 'react';
import {StyleSheet, Text, Touchable, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import {IMGPenginapan1} from '../../assets';
import {Gap} from '../../components';

const index = () => {
  const [initialPage, setInitialPage] = useState(0);
  const ref = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text>Selamat Datang Kembali</Text>
        <Text>Wulandari</Text>

        <View style={styles.menuWrapper}>
          <TouchableOpacity
            style=""
            onPress={() => {
              setInitialPage(0);
              ref.current.setPage(0);
            }}>
            <Text>Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInitialPage(1);
              ref.current.setPage(1);
            }}>
            <Text>Kelola Kamar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={25} />
      <PagerView
        style={styles.pagerView}
        initialPage={initialPage}
        ref={ref}
        onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
        <View key="1">
          <View>
            <View style={styles.cardWrapper}>
              <View style={styles.pembungkus1}>
                <Image style={styles.gambar} source={IMGPenginapan1} />
                <View>
                  <Text style={styles.kamar1}>Kamar Reguler</Text>
                  <Text style={styles.harga1}>Rp. 220. 000 / Malam</Text>
                </View>
              </View>

              <View>
                <Text style={styles.sedia1}>Tersedia</Text>
              </View>
            </View>

            <View style={styles.cardWrapper2}>
              <View style={styles.pembungkus2}>
                <Image style={styles.gambar2} source={IMGPenginapan1} />
                <View>
                  <Text style={styles.kamar2}>Kamar Reguler</Text>
                  <Text style={styles.harga2}>Rp. 220. 000 / Malam</Text>
                </View>
              </View>

              <View>
                <Text style={styles.status1}>Tidak Tersedia</Text>
              </View>
            </View>
          </View>
        </View>
        <View key="2">
          <Text>Second page</Text>
        </View>
      </PagerView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  penginapan: {
    width: 83,
    height: 83,
    borderRadius: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    padding: 30,
  },
  headerWrapper: {
    backgroundColor: '#7DE1C9',
    marginHorizontal: -30,
    marginTop: -30,
    padding: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 43,
  },
  pagerView: {
    flex: 1,
  },
  cardWrapper: {
    padding: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  gambar: {
    height: 83,
    width: 83,
  },
  kamar1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  harga1: {
    fontSize: 12,
    color: '#8A8A8A',
    marginLeft: 20,
  },
  pembungkus1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sedia1: {
    fontSize: 8,
    color: 'white',
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 15,
  },
  cardWrapper2: {
    padding: 20,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  gambar2: {
    height: 83,
    width: 83,
  },
  kamar2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  harga2: {
    fontSize: 12,
    color: '#8A8A8A',
    marginLeft: 20,
  },
  pembungkus2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status1: {
    fontSize: 8,
    color: 'white',
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 15,
  },
});
