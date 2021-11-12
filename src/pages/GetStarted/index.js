import React, {useState, useD} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ICClose, IMGGetStarted} from '../../assets';
import {Button, Gap, Link, Loading} from '../../components';
import {fonts} from '../../utils';
import {actionLogin, actionRegister} from '../../redux/action/auth';
import {useDispatch, useSelector} from 'react-redux';

const GetStarted = ({navigation}) => {
  const [formLogin, setFormLogin] = useState(false);
  const [formRegister, setFormRegister] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);
  console.log('isLoading', isLoading);

  const handleClickLogin = async () => {
    const data = {
      email: email.toLowerCase(),
      password,
    };

    const response = await dispatch(actionLogin(data));

    if (response?.diagnostic?.status === 200) {
      if (response?.result.level === 'user') {
        return navigation.replace('MainApp');
      } else if (response?.result.level === 'super') {
        return navigation.replace('SuperAdminHome');
      }
      return navigation.replace('AdminPesanan');
    }

    console.log('responseHalaman Login', response);
  };

  const handleClickRegister = async () => {
    const data = {
      email: email.toLowerCase(),
      password,
      nama: namaLengkap,
      level: 'user',
    };

    const response = await dispatch(actionRegister(data));

    console.log(
      'response?.diagnostic?.status === 200',
      response?.diagnostic?.status === 200,
    );

    if (response?.diagnostic?.status === 200) {
      setEmail('');
      setPassword('');
      setNamaLengkap('');
      setFormRegister(false);
      return setFormLogin(true);
    }

    // console.log('responseHalaman Login', response);
  };

  if (formLogin) {
    return (
      <ImageBackground source={IMGGetStarted} style={styles.page}>
        <Gap />
        <View style={styles.wrapperFormLogin}>
          <View style={styles.headerFormLogin}>
            <Text style={styles.titleFormLogin}>Masuk</Text>
            <TouchableOpacity onPress={() => setFormLogin(false)}>
              <ICClose />
            </TouchableOpacity>
          </View>
          <Gap height={24} />

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

          <Gap height={30} />

          <Button
            disable={!isLoading}
            title="Masuk"
            onPress={handleClickLogin}
          />

          <View style={styles.wrapperShowRegistrasi}>
            <Text>Belum Punya Akun ? </Text>
            <Link
              title="Registrasi"
              size={15}
              align="center"
              onPress={() => {
                setFormRegister(true);
                setFormLogin(false);
              }}
            />
          </View>
        </View>
        {isLoading && <Loading />}
      </ImageBackground>
    );
  }

  if (formRegister) {
    return (
      <ImageBackground source={IMGGetStarted} style={styles.page}>
        <Gap />
        <View style={styles.wrapperFormLogin}>
          <View style={styles.headerFormLogin}>
            <Text style={styles.titleFormLogin}>Registrasi</Text>
            <TouchableOpacity onPress={() => setFormRegister(false)}>
              <ICClose />
            </TouchableOpacity>
          </View>
          <Gap height={24} />

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

          <Gap height={30} />

          <Button title="Daftar" onPress={handleClickRegister} />

          <View style={styles.wrapperShowRegistrasi}>
            <Text>Sudah Punya Akun ? </Text>
            <Link
              title="Masuk"
              size={15}
              align="center"
              onPress={() => {
                setFormRegister(false);
                setFormLogin(true);
              }}
            />
          </View>
        </View>
        {isLoading && <Loading />}
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={IMGGetStarted} style={styles.page}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          Agendakan perjalanan anda bersama keluarga dengan sangat mudah
        </Text>
      </View>

      <View>
        <Button title="Masuk" onPress={() => setFormLogin(true)} />
        <Gap height={10} />
        <Button
          type="secondary"
          title="Registrasi"
          onPress={() => setFormRegister(true)}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 40,
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
    fontFamily: fonts.primary[800],
    textTransform: 'capitalize',
  },
  wrapperFormLogin: {
    backgroundColor: 'white',
    margin: -40,
    padding: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerFormLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleFormLogin: {
    fontSize: 24,
    fontFamily: fonts.primary[800],
  },
  inputFormLogin: {
    paddingHorizontal: 0,
  },
  wrapperShowRegistrasi: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
});
