import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {ICClose, IMGGetStarted} from '../../assets';
import {Button, Gap, Link} from '../../components';
import {fonts} from '../../utils';

const GetStarted = ({navigation}) => {
  const [formLogin, setFormLogin] = useState(false);
  const [formRegister, setFormRegister] = useState(false);

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
          />

          <Gap height={16} />

          <TextInput
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

          <Button title="Masuk" onPress={() => setFormLogin(true)} />

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
            label="Nama Lengkap"
            style={styles.inputFormLogin}
            theme={{
              colors: {background: 'transparent', primary: '#000'},
            }}
          />

          <Gap height={16} />

          <TextInput
            label="Email"
            style={styles.inputFormLogin}
            theme={{
              colors: {background: 'transparent', primary: '#000'},
            }}
          />

          <Gap height={16} />

          <TextInput
            label="Kata Sandi"
            secureTextEntry={true}
            style={styles.inputFormLogin}
            theme={{
              colors: {background: 'transparent', primary: '#000'},
            }}
          />
          <Gap height={16} />

          <TextInput
            label="Ulangi Kata Sandi"
            secureTextEntry={true}
            style={styles.inputFormLogin}
            theme={
              {
                // colors: {background: 'transparent', primary: '#000'},
              }
            }
          />

          <Gap height={30} />

          <Button title="Daftar" onPress={() => setFormLogin(true)} />

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
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={IMGGetStarted} style={styles.page}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          agendakan perjalan anda bersama keluarga dengan sangat mudah
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
