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

const TambahPenginapan = ({navigation}) => {
  const dataUser = useSelector(state => state.auth.dataUser);
  console.log('dataUser', dataUser);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useForm({
    idAdmin: dataUser.id,
    nama: '',
    lokasi: '',
    longitude: '120.4518699',
    latitude: '-5.5884085',
    deskripsi: '',
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
          console.log('response', response.data);
          setForm('foto', response?.assets[0]);
        }
      },
    );
  };

  const handleClickAddRoom = async () => {
    console.log('form', form);

    setIsLoading(true);

    const sendData = new FormData();
    sendData.append('idAdmin', form.idAdmin);
    sendData.append('nama', form.nama);
    sendData.append('lokasi', form.lokasi);
    sendData.append('longitude', form.longitude);
    sendData.append('latitude', form.latitude);
    sendData.append('deskripsi', form.deskripsi);
    sendData.append('bank', form.bank);
    sendData.append('norek', form.norek);
    sendData.append('foto', {
      uri: form.foto.uri,
      name: 'Penginapan',
      type: form.foto.type,
    });

    await axios
      .post('https://skripsi-wulan.herokuapp.com/penginapan', sendData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('res', res);
        setIsLoading(false);
        setForm('reset');
        return showSucces('Sukses menambah penginapan');
      })
      .catch(err => {
        console.log('err', err.response);
        showError('Oopps ! Something wrong');

        return setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Header
        title="Tambah Penginapan"
        onPress={() => navigation.goBack()}
        icColor="#000"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Gap height={10} />
          <Input
            value={form.nama}
            label="Nama Penginapan"
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
            value={form.bank}
            label="Bank"
            onChangeText={value => setForm('bank', value)}
          />

          <Gap height={20} />
          <Input
            value={form.norek}
            label="Nomor Rekening"
            keyboardType="phone-pad"
            onChangeText={value => setForm('norek', value)}
          />

          <Gap height={20} />
          <Input
            label="Foto Penginapan"
            value={form.foto.fileName}
            onChangeText={value => setForm('foto', value)}
            onFocus={() => getImage()}
          />

          <Gap height={20} />
          {form.foto !== '' && (
            <View>
              <View style={{justifyContent: 'center'}}>
                <View style={styles.fotoViewWrapper}>
                  <Image
                    source={{uri: form.foto?.uri}}
                    style={styles.fotoView}
                  />
                </View>
              </View>
            </View>
          )}
          <Gap height={20} />
        </View>
        <Gap height={20} />
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnWrapper}
            onPress={handleClickAddRoom}>
            <Text style={styles.btnTitle}>Tambah</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {isLoading && <Loading />}
    </View>
  );
};

export default TambahPenginapan;

const styles = StyleSheet.create({
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
