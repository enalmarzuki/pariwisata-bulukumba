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
import {useDispatch, useSelector} from 'react-redux';
import {Button, Gap, Header, Input, Loading} from '../../components';
import {actionRegister} from '../../redux/action/auth';
import {colors, fonts, useForm} from '../../utils';
import {showError, showSucces} from '../../utils/showMessage';

const TambahPenginapan = ({route, navigation}) => {
  const {params} = route;
  console.log('params', params);
  const dataUser = useSelector(state => state.auth.dataUser);
  console.log('dataUser', dataUser);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useForm({
    nama: '',
    lokasi: '',
    longitude: '120.4518699',
    latitude: '-5.5884085',
    deskripsi: '',
    foto: '',
  });
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');

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
    sendData.append('nama', form.nama);
    sendData.append('lokasi', form.lokasi);
    sendData.append('longitude', form.longitude);
    sendData.append('latitude', form.latitude);
    sendData.append('deskripsi', form.deskripsi);
    sendData.append('foto', {
      uri: form.foto.uri,
      name: 'Penginapan',
      type: form.foto.type,
    });

    await axios
      .post(`https://skripsi-wulan.herokuapp.com/${params.key}`, sendData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('res', res);
        setIsLoading(false);
        setForm('reset');
        return showSucces('Sukses menambah');
      })
      .catch(err => {
        console.log('err', err.response);
        showError('Oopps ! Something wrong');

        return setIsLoading(false);
      });
  };

  const handleClickRegister = async () => {
    const data = {
      email: email.toLowerCase(),
      password,
      nama: namaLengkap,
      level: 'admin',
    };

    setIsLoading(true);

    const response = await dispatch(actionRegister(data));
    console.log('response', response);

    if (response?.diagnostic?.status === 200) {
      setEmail('');
      setPassword('');
      setNamaLengkap('');
      setIsLoading(false);
      return navigation.goBack();
    }

    // console.log('responseHalaman Login', response);
  };

  if (params.key === 'adminPenginapan') {
    return (
      <View style={styles.container}>
        <Header
          title="Tambah Admin Penginapan"
          onPress={() => navigation.goBack()}
          icColor="#000"
        />
        <View style={styles.formWrapper}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Gap height={10} />
            <View style={{padding: 30}}>
              <TextInput
                value={namaLengkap}
                label="Nama Lengkap"
                style={styles.inputFormLogin}
                underlineColor={'#000'}
                theme={{
                  colors: {
                    background: 'transparent',
                    primary: '#000',
                    text: '#000',
                    placeholder: '#000',
                  },
                }}
                onChangeText={value => setNamaLengkap(value)}
              />

              <Gap height={16} />

              <TextInput
                value={email}
                label="Email"
                style={styles.inputFormLogin}
                underlineColor={'#000'}
                theme={{
                  colors: {
                    background: 'transparent',
                    primary: '#000',
                    text: '#000',
                    placeholder: '#000',
                  },
                }}
                onChangeText={value => setEmail(value)}
              />

              <Gap height={16} />

              <TextInput
                value={password}
                onChangeText={value => setPassword(value)}
                label="Kata Sandi"
                secureTextEntry={true}
                underlineColor={'#000'}
                style={styles.inputFormLogin}
                theme={{
                  colors: {
                    background: 'transparent',
                    primary: '#000',
                    text: '#000',
                    placeholder: '#000',
                  },
                }}
              />
            </View>
          </ScrollView>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnWrapper}
              onPress={handleClickRegister}>
              <Text style={styles.btnTitle}>Tambah</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isLoading && <Loading />}
      </View>
    );
  }

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
        </ScrollView>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnWrapper}
            onPress={handleClickAddRoom}>
            <Text style={styles.btnTitle}>Tambah</Text>
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
