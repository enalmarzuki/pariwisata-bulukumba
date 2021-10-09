/* eslint-disable no-shadow */
import moment from 'moment';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  Menu,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {Gap, Input} from '../../..';
import {fonts, useForm} from '../../../../utils';
import DropDown from 'react-native-paper-dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';

const genderList = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Others',
    value: 'others',
  },
];

const Tambah = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [form, setForm] = useForm({
    tglMasuk: '',
    jam: '',
    destinasi: 'Wisata',
    tujuan: '',
  });
  const [showDropDown, setShowDropDown] = useState(false);

  console.log('form', form);

  const hideDialog = () => {
    navigation.goBack();
    return setVisible(false);
  };

  const updateData = (e, target) => {
    const date = moment(e).format('DD MMMM YYYY');

    return setForm(target, date);
  };

  const handleChangeDropdown = value => {
    return setForm('tujuan', value);
  };

  return (
    <Dialog style={styles.modal} visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={styles.modalTitle}>Tambah Agenda</Dialog.Title>
      <Dialog.ScrollArea style={styles.modalBody}>
        <ScrollView>
          <Input
            type="date"
            label="Tanggal Masuk"
            value={form.tglMasuk}
            onChangeText={e => updateData(e, 'tglMasuk')}
          />
          <Gap height={20} />
          <Input
            type="timePicker"
            data={form.jam}
            label="Jam"
            value={form.jam}
            onChangeText={value => setForm('jam', value)}
          />
          <Gap height={20} />
          <View>
            <Text>Destinasi</Text>
            <RadioButton.Group
              onValueChange={value => setForm('destinasi', value)}
              value={form.destinasi}>
              <RadioButton.Item label="Wisata" value="Wisata" />
              <RadioButton.Item label="Kuliner" value="Kuliner" />
              <RadioButton.Item label="Oleh - Oleh" value="Oleh - Oleh" />
            </RadioButton.Group>
          </View>
          <Gap height={20} />
          <Input
            data={form.tujuan}
            label="Tujuan"
            value={form.tujuan}
            onChangeText={value => setForm('tujuan', value)}
          />
          <Gap height={30} />

          <TouchableOpacity
            style={styles.btnTambah}
            onPress={() => {
              navigation.goBack();
              return setVisible(false);
            }}>
            <Text style={styles.btnText}>Tambah</Text>
          </TouchableOpacity>

          {/* <DropDown
            label={'Tujuan'}
            mode={'flat'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={form.tujuan}
            setValue={value => handleChangeDropdown(value)}
            list={genderList}
            inputProps={{
              style: {
                paddingHorizontal: 0,
              },
              right: <Text />,
            }}
            theme={{
              colors: {
                background: 'transparent',
                primary: '#7DE1C9',
                text: '#000',
                placeholder: form.tujuan ? '#7DE1C9' : '#000',
              },
            }}
          /> */}
        </ScrollView>
      </Dialog.ScrollArea>
    </Dialog>
  );
};

export default Tambah;

const styles = StyleSheet.create({
  modal: {
    borderRadius: 30,
    paddingVertical: 10,
  },
  modalTitle: {
    color: '#7DE1C9',
  },
  modalBody: {
    paddingBottom: 30,
  },
  inputFormLogin: {
    paddingHorizontal: 0,
    flex: 1,
  },
  btnTambah: {
    backgroundColor: '#7DE1C9',
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    fontSize: 18,
  },
});
