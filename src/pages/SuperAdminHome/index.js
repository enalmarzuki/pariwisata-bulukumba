/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import {useDispatch, useSelector} from 'react-redux';
import {ICPlus, IMGEmptyLodging} from '../../assets';
import {Gap} from '../../components';
import {
  actionGetKuliner,
  actionGetOlehOleh,
  actionGetUserAdmin,
  actionGetWisata,
} from '../../redux/action/superAdmin';
import {colors, fonts} from '../../utils';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';

const SuperAdminHome = ({navigation}) => {
  const [initialPage, setInitialPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showBtnDelete, setShowBtnDelete] = useState(false);
  const isFocus = useIsFocused();

  const ref = useRef();
  const dataUser = useSelector(state => state.auth.dataUser);
  const dispatch = useDispatch();
  const dataSuperAdminHome = useSelector(state => state.superAdmin);
  console.log('listWisata', dataSuperAdminHome);

  const getDataSuperAdmin = useCallback(async () => {
    await dispatch(actionGetWisata());
    await dispatch(actionGetKuliner());
    await dispatch(actionGetOlehOleh());
    await dispatch(actionGetUserAdmin());

    setRefreshing(false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataSuperAdmin();
  }, []);

  useEffect(() => {
    getDataSuperAdmin();
  }, [isFocus]);

  const AlertDelete = (id, type) => {
    Alert.alert('Agenda Pariwisata', 'Apakah anda yakin ingin menghapus ?', [
      {
        text: 'Tidak',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Iya',
        onPress: () => {
          axios
            .delete(`https://skripsi-wulan.herokuapp.com/${type}/${id}`)
            .then(res => {
              console.log('res.data', res.data);
              return getDataSuperAdmin();
            })
            .catch(err => console.log('err', err));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.textWelcome}>Selamat Datang Kembali</Text>
        <Text style={styles.namaUser}>{dataUser.nama}</Text>

        <ScrollView
          contentContainerStyle={{flexDirection: 'row'}}
          horizontal
          style={styles.menuWrapper}>
          <TouchableOpacity
            onPress={() => {
              setInitialPage(0);
              ref.current.setPage(0);
            }}>
            <Text style={styles.btnTabPesanan(initialPage)}>Wisata</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInitialPage(1);
              ref.current.setPage(1);
            }}>
            <Text style={styles.btnTabKelolaKamar(initialPage)}>Kuliner</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInitialPage(2);
              ref.current.setPage(2);
            }}>
            <Text style={styles.btnTabOleh(initialPage)}>Oleh - Oleh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInitialPage(3);
              ref.current.setPage(3);
            }}>
            <Text style={styles.btnTabAdminPenginapan(initialPage)}>
              Admin Penginapan
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Gap height={25} />

      {dataSuperAdminHome.dataWisata === '' ||
      dataSuperAdminHome.dataKuliner === '' ||
      dataSuperAdminHome.dataOleh === '' ||
      dataSuperAdminHome.dataUser === '' ? (
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
              {dataSuperAdminHome.dataWisata?.length === 0 ? (
                <View style={styles.emptyList}>
                  <Image
                    source={IMGEmptyLodging}
                    style={styles.imageEmptyLodging}
                  />
                  <Text>Oopss! Wisata tidak tersedia </Text>
                </View>
              ) : (
                <>
                  {dataSuperAdminHome.dataWisata?.map(wisata => (
                    <View key={wisata._id}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditDataSuperAdmin', {
                            data: wisata,
                            key: 'wisata',
                          })
                        }
                        onLongPress={() => AlertDelete(wisata._id, 'wisata')}>
                        <View style={styles.cardWrapper}>
                          <View style={styles.pembungkus1}>
                            <Image
                              style={styles.gambar}
                              source={{
                                uri: `${wisata.foto}`,
                              }}
                            />
                            <View style={styles.cardBody}>
                              <Text style={styles.kamar1}>{wisata.nama}</Text>
                              <Text style={styles.harga1}>{wisata.lokasi}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>

            <View style={styles.btnAddNewRoom}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TambahDataSuperAdmin', {key: 'wisata'})
                }>
                <ICPlus />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pagerView} key="2">
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {dataSuperAdminHome.dataWisata?.length === 0 ? (
                <View style={styles.emptyList}>
                  <Image
                    source={IMGEmptyLodging}
                    style={styles.imageEmptyLodging}
                  />
                  <Text>Oopss! Kuliner tidak tersedia </Text>
                </View>
              ) : (
                <>
                  {dataSuperAdminHome.dataKuliner?.map(kuliner => (
                    <View key={kuliner._id}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditDataSuperAdmin', {
                            data: kuliner,
                            key: 'kuliner',
                          })
                        }
                        onLongPress={() => AlertDelete(kuliner._id, 'kuliner')}>
                        <View style={styles.cardWrapper}>
                          <View style={styles.pembungkus1}>
                            <Image
                              style={styles.gambar}
                              source={{
                                uri: `${kuliner.foto}`,
                              }}
                            />
                            <View style={styles.cardBody}>
                              <Text style={styles.kamar1}>{kuliner.nama}</Text>
                              <Text style={styles.harga1}>
                                {kuliner.lokasi}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>

            <View style={styles.btnAddNewRoom}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TambahDataSuperAdmin', {key: 'kuliner'})
                }>
                <ICPlus />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pagerView} key="3">
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {dataSuperAdminHome.dataOleh?.length === 0 ? (
                <View style={styles.emptyList}>
                  <Image
                    source={IMGEmptyLodging}
                    style={styles.imageEmptyLodging}
                  />
                  <Text>Oopss! Oleh - oleh tidak tersedia </Text>
                </View>
              ) : (
                <>
                  {dataSuperAdminHome.dataOleh?.map(oleh => (
                    <View key={oleh._id}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('EditDataSuperAdmin', {
                            data: oleh,
                            key: 'toko',
                          })
                        }
                        onLongPress={() => AlertDelete(oleh._id, 'toko')}>
                        <View style={styles.cardWrapper}>
                          <View style={styles.pembungkus1}>
                            <Image
                              style={styles.gambar}
                              source={{
                                uri: `${oleh.foto}`,
                              }}
                            />
                            <View style={styles.cardBody}>
                              <Text style={styles.kamar1}>{oleh.nama}</Text>
                              <Text style={styles.harga1}>{oleh.lokasi}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>

            <View style={styles.btnAddNewRoom}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TambahDataSuperAdmin', {key: 'toko'})
                }>
                <ICPlus />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pagerView} key="4">
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {dataSuperAdminHome.dataUser?.length === 0 ? (
                <View style={styles.emptyList}>
                  <Image
                    source={IMGEmptyLodging}
                    style={styles.imageEmptyLodging}
                  />
                  <Text>Oopss! Admin penginapan tidak ada </Text>
                </View>
              ) : (
                <>
                  {dataSuperAdminHome.dataUser?.map(admin => (
                    <View key={admin._id}>
                      <TouchableOpacity>
                        <View style={styles.cardWrapper}>
                          <View style={styles.pembungkus1}>
                            <View style={styles.cardBody}>
                              <Text style={styles.kamar1}>{admin.nama}</Text>
                              <Text style={styles.harga1}>{admin.email}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                </>
              )}
            </ScrollView>

            <View style={styles.btnAddNewRoom}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TambahDataSuperAdmin', {
                    key: 'adminPenginapan',
                  })
                }>
                <ICPlus />
              </TouchableOpacity>
            </View>
          </View>
        </PagerView>
      )}
    </View>
  );
};

export default SuperAdminHome;

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

  btnTabOleh: page => ({
    color: 'white',
    fontFamily: fonts.primary[700],
    // backgroundColor: 'red',
    fontSize: 18,
    textTransform: 'capitalize',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: page === 2 ? 2 : 0,
    borderBottomColor: 'white',
  }),

  btnTabAdminPenginapan: page => ({
    color: 'white',
    fontFamily: fonts.primary[700],
    // backgroundColor: 'red',
    fontSize: 18,
    textTransform: 'capitalize',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: page === 3 ? 2 : 0,
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
