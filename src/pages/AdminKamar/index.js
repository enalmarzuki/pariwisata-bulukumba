/* eslint-disable react-hooks/exhaustive-deps */
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Lightbox from 'react-native-lightbox-v2';
import {IMGBuktiTF, IMGKamar1} from '../../assets';
import {Gap, Input} from '../../components/atoms';
import {colors, fonts} from '../../utils';
import {Card, Loading, SectionTitle} from '../../components';
import {actionGetRoomAdmin} from '../../redux/action/kamar';
import {useDispatch, useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import {showError, showSucces} from '../../utils/showMessage';

const AdminKamar = ({route, navigation}) => {
  const {params} = route;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(null);
  const [sedia, setSedia] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getKamar();
  }, [getKamar]);

  console.log('params', params);

  const listKamar = useSelector(state => state.kamar);
  console.log('listKamar', listKamar);
  // console.log('value', value);

  const dispatch = useDispatch();

  const getKamar = useCallback(async () => {
    const response = await dispatch(
      actionGetRoomAdmin(params.dataPenginapan._id),
    );

    console.log('response', response);

    const dataListKamar = response.result.map(item => ({
      label: item.tipe,
      value: item._id,
    }));

    setItems(dataListKamar);
    setRefreshing(false);
    return response;
  }, [dispatch, params.dataPenginapan._id]);

  const handleClickUpdateKamar = async () => {
    setIsLoading(true);
    const d = {
      sedia: sedia,
    };
    console.log('value', value);
    const formUrlEncoded = x =>
      Object.keys(d).reduce(
        (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
        '',
      );

    const data = formUrlEncoded({
      sedia: sedia,
    });

    const resp = await axios
      .put(`https://skripsi-wulan.herokuapp.com/kamar/${value}`, data, {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      .then(res => {
        setIsLoading(false);
        showSucces('Berhasil update status kamar');
        return res;
      })
      .catch(err => {
        showError('Somethings wrong');
        setIsLoading(false);
        return err;
      });

    return resp;
  };

  useEffect(() => {
    getKamar();
  }, []);

  console.log('listKamar', listKamar);

  if (listKamar.isLoading) {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View>
          <View style={styles.kamarWrapper}>
            <Image
              style={styles.kamar}
              source={{uri: params.dataPenginapan.foto}}
            />
          </View>
          <View style={styles.hargaWrapper}>
            <Text style={styles.namakamar}>{params.dataPenginapan.nama}</Text>
            <Text style={styles.hargakamar}>
              {params.dataPenginapan.lokasi}
            </Text>
          </View>
          <Gap height={30} />
          <View style={styles.container}>
            <Text style={styles.hargakamar}>
              {params.dataPenginapan.deskripsi}
            </Text>
            <Gap height={30} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <SectionTitle title="Kamar" />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('TambahKamar', {
                    idPenginapan: params.dataPenginapan._id,
                  })
                }>
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: fonts.primary[700],
                  }}>
                  + Tambah Kamar
                </Text>
              </TouchableOpacity>
            </View>
            <Gap height={30} />

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{marginHorizontal: -30}}>
              <Gap width={30} />
              {listKamar?.dataKamar?.map(room => (
                <Card
                  key={room._id}
                  isRoomType
                  // image={room.image}
                  // title={room.title}
                  // subTitle={room.subTitle}
                  data={room}
                />
              ))}
            </ScrollView>
            <Gap height={30} />
            <SectionTitle title="Update Kamar" />
            <Gap height={30} />

            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Pilih"
              style={{
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
              dropDownContainerStyle={{
                backgroundColor: '#dfdfdf',
                borderWidth: 0,
              }}
            />

            <Gap height={30} />

            <RadioButton.Group
              onValueChange={value => setSedia(value)}
              value={sedia}>
              <RadioButton.Item label="Tersedia" value={true} />
              <RadioButton.Item label="Tidak Tersedia" value={false} />
            </RadioButton.Group>
          </View>
        </View>
        <Gap height={60} />
        <View style={styles.btnKonfirmasiWrapper}>
          <View style={styles.btnWrapper}>
            <TouchableOpacity
              onPress={handleClickUpdateKamar}
              activeOpacity={0.5}
              style={styles.btnKonfirmasi('')}>
              <Text style={styles.btnKonfirmasiText}>Update Kamar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
};

export default AdminKamar;

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 30,
  },
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
    // height: hp('50%'),
    // width: wp('100%'),
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
    borderRadius: 10,
  },
  namakamar: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hargakamar: {
    marginTop: 3,
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
