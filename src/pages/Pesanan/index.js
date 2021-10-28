/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Touchable,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import {useDispatch, useSelector} from 'react-redux';
import {IMGPenginapan1, ICPlus, IMGEmptyLodging} from '../../assets';
import {Gap} from '../../components';
import {actionGetAdminPenginapan} from '../../redux/action/penginapan';
import {actionGetDetailPesananAdmin} from '../../redux/action/pesananUser';
import {colors, fonts} from '../../utils';

const StatusPesanan = ({status}) => {
  if (status === 'tidak tersedia') {
    return <Text style={styles.tidakTersedia}>{status}</Text>;
  }
  return <Text style={styles[status]}>{status}</Text>;
};

const index = ({navigation}) => {
  const [initialPage, setInitialPage] = useState(0);
  const dataUser = useSelector(state => state.auth.dataUser);
  const dataPesanan = useSelector(state => state.pesananUser);
  console.log('dataPesanan', dataPesanan);
  const listPenginapan = useSelector(state => state.penginapan);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPenginapanAdmin();
    getPesananAdmin();
  }, [getPenginapanAdmin, getPesananAdmin]);
  const dispatch = useDispatch();
  const ref = useRef();

  console.log('listPenginapan', listPenginapan);
  // console.log('initialPage', initialPage);
  // console.log('initialPage', initialPage);

  const getPenginapanAdmin = useCallback(async () => {
    const response = await dispatch(actionGetAdminPenginapan(dataUser.id));
    console.log('response', response);
    setRefreshing(false);

    return response;
  }, [dispatch, dataUser.id]);

  const getPesananAdmin = useCallback(async () => {
    const response = await dispatch(actionGetDetailPesananAdmin(dataUser.id));
    setRefreshing(false);

    return response;
  }, [dispatch, dataUser.id]);

  useEffect(() => {
    getPenginapanAdmin();
    getPesananAdmin();
  }, [getPenginapanAdmin, getPesananAdmin]);

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
              Penginapan
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={25} />

      {listPenginapan.isLoading ? (
        <View style={styles.emptyList}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <PagerView
          style={styles.pagerView}
          initialPage={initialPage}
          ref={ref}
          onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
          <View style={styles.pagerView} key="1">
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {listPenginapan.dataPenginapan.length === 0 ? (
                <View style={styles.emptyList}>
                  <Image
                    source={IMGEmptyLodging}
                    style={styles.imageEmptyLodging}
                  />
                  <Text>Oopss! Penginapan tidak tersedia </Text>
                </View>
              ) : (
                <>
                  {dataPesanan?.dataListPesanan?.map(item => (
                    <View key={item._id}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AdminDetailPesanan', {
                            dataPenginapan: item,
                          })
                        }>
                        <View style={styles.cardWrapper}>
                          <View style={styles.pembungkus1}>
                            <Image
                              style={styles.gambar}
                              source={{
                                uri: `${item.kamar.foto}`,
                              }}
                            />
                            <View style={styles.cardBody}>
                              <Text style={styles.kamar1}>{item.pemesan}</Text>
                              <Text style={styles.harga1}>
                                {item.kamar.tipe}
                              </Text>
                            </View>
                          </View>

                          <View>
                            <StatusPesanan status={`${item.status}`} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>
          </View>
          <View style={styles.pagerView} key="2">
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {listPenginapan.dataPenginapan.length === 0 ? (
                <View style={styles.emptyList}>
                  <Image
                    source={IMGEmptyLodging}
                    style={styles.imageEmptyLodging}
                  />
                  <Text>Oopss! Penginapan tidak tersedia </Text>
                </View>
              ) : (
                <>
                  {listPenginapan.dataPenginapan?.map(item => (
                    <View key={item._id}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AdminKamar', {
                            dataPenginapan: item,
                          })
                        }>
                        <View style={styles.cardWrapper}>
                          <View style={styles.pembungkus1}>
                            <Image
                              style={styles.gambar}
                              source={{
                                uri: `${item.foto}`,
                              }}
                            />
                            <View style={styles.cardBody}>
                              <Text style={styles.kamar1}>{item.nama}</Text>
                              <Text style={styles.harga1}>{item.lokasi}</Text>
                            </View>
                          </View>

                          {/* <View>
                          <StatusPesanan status="tidak tersedia" />
                        </View> */}
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>

            <View style={styles.btnAddNewRoom}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TambahPenginapan')}>
                <ICPlus />
              </TouchableOpacity>
            </View>
          </View>
        </PagerView>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmptyLodging: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  btnAddNewRoom: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#7DE1C9',
    padding: 15,
    borderRadius: 30,
  },
  btnAddNewRoomText: {
    width: 20,
    height: 20,
  },
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
    paddingHorizontal: 60,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 43,
    marginHorizontal: -30,
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
    marginBottom: 20,
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
    fontSize: 8,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#7DE1C9',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 15,
  },
  tersedia: {
    fontSize: 8,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#7DE1C9',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 15,
  },
  tolak: {
    fontSize: 8,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#DC0000',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 15,
  },
  tidakTersedia: {
    fontSize: 8,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#DC0000',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 15,
  },
  pending: {
    fontSize: 8,
    fontFamily: fonts.primary[700],
    textTransform: 'capitalize',
    color: 'white',
    backgroundColor: '#FFD200',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 15,
  },
});
