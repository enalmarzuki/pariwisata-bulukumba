import axios from 'axios';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {colors, fonts, useForm} from '../../utils';
import {showError, showSucces} from '../../utils/showMessage';

const TambahPenginapan = ({route, navigation}) => {
  const {params} = route;
  console.log('params', params);
  console.log('params.data._id', params.data._id);
  const dataUser = useSelector(state => state.auth.dataUser);
  console.log('dataUser', dataUser);
  const [isLoading, setIsLoading] = useState(false);
  const [nameFoto, setNameFoto] = useState('');
  const [form, setForm] = useForm({
    nama: params.data.nama,
    lokasi: params.data.lokasi,
    longitude: params.data.longitude,
    latitude: params.data.latitude,
    deskripsi: params.data.deskripsi,
    foto: params.data.foto,
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
          console.log('response', response.data);
          setForm('foto', response?.assets[0].uri);
          setNameFoto(response?.assets[0].fileName);
        }
      },
    );
  };

  const handleClickAddRoom = async () => {
    console.log('form', form);

    setIsLoading(true);

    const formUrlEncoded = x =>
      Object.keys(form).reduce(
        (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
        '',
      );

    const data = formUrlEncoded(form);

    await axios
      .put(
        `https://skripsi-wulan.herokuapp.com/${params.key}/${params.data._id}`,
        data,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then(res => {
        console.log('res', res);
        setIsLoading(false);
        setForm('reset');
        showSucces('Sukses menambah');
        return navigation.goBack();
      })
      .catch(err => {
        console.log('err', err.response.data);
        showError('Oopps ! Something wrong');

        return setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Tambah Master Data"
        onPress={() => navigation.goBack()}
        icColor="#000"
      />
      <View style={styles.formWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <Gap height={10} />
            <Input
              value={form.nama}
              label="Nama"
              onChangeText={value => setForm('nama', value)}
            />

            <Gap height={20} />
            <Input
              value={form.lokasi}
              label="Lokasi"
              onChangeText={value => setForm('lokasi', value)}
            />

            <Gap height={20} />
            <Input
              value={form.longitude}
              label="Longitude"
              onChangeText={value => setForm('longitude', value)}
            />

            <Gap height={20} />
            <Input
              value={form.latitude}
              label="Latitude"
              onChangeText={value => setForm('latitude', value)}
            />

            <Gap height={20} />
            <Input
              value={form.deskripsi}
              label="Deskripsi"
              onChangeText={value => setForm('deskripsi', value)}
            />

            <Gap height={20} />
            <Input
              label="Foto"
              value={nameFoto}
              onChangeText={value => setForm('foto', value)}
              onFocus={() => getImage()}
            />

            <Gap height={20} />
            {form.foto !== '' && (
              <View>
                <View style={{justifyContent: 'center'}}>
                  <View style={styles.fotoViewWrapper}>
                    <Image source={{uri: form.foto}} style={styles.fotoView} />
                  </View>
                </View>
              </View>
            )}
            <Gap height={20} />
          </View>
          <Gap height={20} />
        </ScrollView>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnWrapper}
            onPress={handleClickAddRoom}>
            <Text style={styles.btnTitle}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isLoading && <Loading />}
    </View>
  );
};

export default TambahPenginapan;

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
  },
  btnWrapper: {
    backgroundColor: colors.primary,
    position: 'relative',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  btnTitle: {
    fontFamily: fonts.primary[700],
    fontSize: 18,
    color: colors.white,
  },
  fotoViewWrapper: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#d2d2d2',
    padding: 10,
  },
  fotoView: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: colors.container,
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 30,
  },
  inputFormLogin: {
    paddingHorizontal: 0,
  },
});
