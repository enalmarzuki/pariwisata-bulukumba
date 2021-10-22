/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useRef} from 'react';
import {StyleSheet, Text, Touchable, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import {useSelector} from 'react-redux';
import {IMGPenginapan1} from '../../assets';
import {Gap} from '../../components';
import {fonts} from '../../utils';

const StatusPesanan = ({status}) => {
  if (status === 'tidak tersedia') {
    return <Text style={styles.tidakTersedia}>{status}</Text>;
  }
  return <Text style={styles[status]}>{status}</Text>;
};

const index = ({navigation}) => {
  const [initialPage, setInitialPage] = useState(0);
  const ref = useRef();
  const dataUser = useSelector(state => state.auth.dataUser);

  console.log('dataUser', dataUser);
  console.log('initialPage', initialPage);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.textWelcome}>Selamat Datang Kembali</Text>
        <Text style={styles.namaUser}>{dataUser.nama}</Text>

        <View style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => {
              setInitialPage(0);
              ref.current.setPage(0);
            }}>
            <Text style={styles.btnTabPesanan(initialPage)}>Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInitialPage(1);
              ref.current.setPage(1);
            }}>
            <Text style={styles.btnTabKelolaKamar(initialPage)}>
              Kelola Kamar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={25} />
      <PagerView
        style={styles.pagerView}
        initialPage={initialPage}
        ref={ref}
        onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
        <View style={styles.pagerView} key="1">
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('AdminDetailPesanan')}>
              <View style={styles.cardWrapper}>
                <View style={styles.pembungkus1}>
                  <Image style={styles.gambar} source={IMGPenginapan1} />
                  <View style={styles.cardBody}>
                    <Text style={styles.kamar1}>Jhon Doe</Text>
                    <Text style={styles.harga1}>Kamar Reguler</Text>
                  </View>
                </View>

                <View>
                  <StatusPesanan status="setuju" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.pagerView} key="2">
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('AdminKamar')}>
              <View style={styles.cardWrapper}>
                <View style={styles.pembungkus1}>
                  <Image style={styles.gambar} source={IMGPenginapan1} />
                  <View style={styles.cardBody}>
                    <Text style={styles.kamar1}>Kamar Reguler</Text>
                    <Text style={styles.harga1}>Rp. 220. 000 / Malam</Text>
                  </View>
                </View>

                <View>
                  <StatusPesanan status="tidak tersedia" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </PagerView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  textWelcome: {
    color: 'white',
    fontFamily: fonts.primary[600],
    marginBottom: 5,
  },
  namaUser: {
    color: 'white',
    fontFamily: fonts.primary[900],
    fontSize: 24,
    textTransform: 'capitalize',
  },
  penginapan: {
    width: 83,
    height: 83,
    borderRadius: 10,
  },

  btnTabPesanan: page => ({
    color: 'white',
    fontFamily: fonts.primary[700],
    // backgroundColor: 'red',
    fontSize: 18,
    textTransform: 'capitalize',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: page === 0 ? 2 : 0,
    borderBottomColor: 'white',
  }),

  btnTabKelolaKamar: page => ({
    color: 'white',
    fontFamily: fonts.primary[700],
    // backgroundColor: 'red',
    fontSize: 18,
    textTransform: 'capitalize',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: page === 1 ? 2 : 0,
    borderBottomColor: 'white',
  }),

  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    paddingTop: 30,
    // paddingHorizontal: 30,
  },
  headerWrapper: {
    backgroundColor: '#7DE1C9',
    marginHorizontal: -30,
    marginTop: -30,
    paddingTop: 30,
    paddingHorizontal: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 43,
  },
  pagerView: {
    flex: 1,
    // backgroundColor: 'red',
    paddingHorizontal: 30,
  },
  cardWrapper: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  gambar: {
    height: 83,
    width: 83,
  },
  cardBody: {
    marginLeft: 20,
  },
  kamar1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  harga1: {
    fontSize: 12,
    color: '#8A8A8A',
  },
  pembungkus1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setuju: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#7DE1C9',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 15,
  },
  tersedia: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#7DE1C9',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 15,
  },
  tolak: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#DC0000',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 15,
  },
  tidakTersedia: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#DC0000',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 15,
  },
  pending: {
    fontSize: 10,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#FFD200',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 15,
  },
});
