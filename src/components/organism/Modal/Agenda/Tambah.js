/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {actionGetDestination} from '../../../../redux/action/destinasi';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

DropDownPicker.setListMode('SCROLLVIEW');

const Tambah = ({navigation}) => {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [form, setForm] = useForm({
    tanggal: '',
    jam: '',
    tipe_lokasi: 'Wisata',
    id_lokasi: value,
  });

  const dispatch = useDispatch();
  const destinationList = useSelector(state => state.destinasi);

  const hideDialog = () => {
    navigation.goBack();
    return setVisible(false);
  };

  const updateData = (e, target) => {
    const date = moment(e).format('DD-MM-YYYY');
    return setForm(target, date);
  };

  const getDestinations = useCallback(async () => {
    return await dispatch(actionGetDestination());
  }, [dispatch]);

  const handleDestinationChange = value => {
    const tempListTujuan = destinationList.dataDestinations[value];
    const dataListTujuan = tempListTujuan.map(item => ({
      label: item.nama,
      value: item._id,
    }));
    setItems(dataListTujuan);
    return setForm('tipe_lokasi', value);
  };

  const handleListChange = callback => {
    return setForm('id_lokasi', callback(items));
  };

  const handleClickAddAgenda = () => {
    axios
      .post('https://skripsi-wulan.herokuapp.com/agenda', form)
      .then(res => {
        console.log('res', res);
        navigation.goBack();
        return setVisible(false);
      })
      .catch(err => console.log('err', err));
  };

  useEffect(() => {
    getDestinations();
  }, [getDestinations]);

  console.log('form', form);

  return (
    <Dialog style={styles.modal} visible={visible} onDismiss={hideDialog}>
      <Dialog.Title style={styles.modalTitle}>Tambah Agenda</Dialog.Title>
      <Dialog.ScrollArea style={styles.modalBody}>
        <ScrollView>
          <Input
            type="date"
            label="Tanggal Masuk"
            value={form.tanggal}
            onChangeText={e => updateData(e, 'tanggal')}
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
              onValueChange={value => handleDestinationChange(value)}
              value={form.tipe_lokasi}>
              <RadioButton.Item label="Wisata" value="Wisata" />
              <RadioButton.Item label="Kuliner" value="Kuliner" />
              <RadioButton.Item label="Oleh - Oleh" value="Toko" />
            </RadioButton.Group>
          </View>
          <Gap height={20} />
          {/* <Input
            data={form.tujuan}
            label="Tujuan"
            value={form.tujuan}
            onChangeText={value => setForm('tujuan', value)}
          />
          <Gap height={30} /> */}
          <DropDownPicker
            open={open}
            value={form.id_lokasi}
            items={items}
            setOpen={setOpen}
            setValue={handleListChange}
            setItems={setItems}
            placeholder="Tujuan"
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

          <TouchableOpacity
            style={styles.btnTambah}
            onPress={handleClickAddAgenda}>
            <Text style={styles.btnText}>Tambah</Text>
          </TouchableOpacity>
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
