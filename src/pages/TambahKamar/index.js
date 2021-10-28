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

const TambahKamar = ({route, navigation}) => {
  const dataUser = useSelector(state => state.auth.dataUser);
  console.log('route', route);
  console.log('dataUser', dataUser);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useForm({
    idPenginapan: route.params.idPenginapan,
    tipe: '',
    foto: '',
    sedia: true,
    harga: '',
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
    const fasilitas = ['Kulkas', 'Ac'];

    setIsLoading(true);

    const sendData = new FormData();
    sendData.append('idPenginapan', form.idPenginapan);
    sendData.append('tipe', form.tipe);
    fasilitas.map((x, i) => sendData.append(`fasilitas[${i}]`, x));
    sendData.append('sedia', form.sedia);
    sendData.append('harga', form.harga);
    sendData.append('foto', {
      uri: form.foto.uri,
      name: 'Penginapan',
      type: form.foto.type,
    });

    await axios
      .post('https://skripsi-wulan.herokuapp.com/kamar', sendData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('res', res);
        setIsLoading(false);
        setForm('reset');
        showSucces('Sukses menambah kamar');
        return navigation.goBack();
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
        title="Tambah Kamar"
        onPress={() => navigation.goBack()}
        icColor="#000"
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Gap height={10} />
          <Input
            value={form.tipe}
            label="Tipe Kamar"
            onChangeText={value => setForm('tipe', value)}
          />

          <Gap height={20} />
          <Input
            value={form.harga}
            label="Harga"
            onChangeText={value => setForm('harga', value)}
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

export default TambahKamar;

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
