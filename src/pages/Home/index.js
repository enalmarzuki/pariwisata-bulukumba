import React, {useEffect} from 'react';
import {
  Image,
  Linking,
  NativeEventEmitter,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {
  ICBook,
  ICHome,
  ICKuliner,
  ICWisata,
  IMGBGHome,
  IMGDummyProfile,
  IMGLogoBulkum,
} from '../../assets';
import {Gap} from '../../components/atoms';
import {fonts} from '../../utils';
import ReactNativeAN from 'react-native-alarm-notification';
import moment from 'moment';

const {RNAlarmNotification} = NativeModules;
const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

const alarmNotifData = {
  title: 'Alarm',
  message: 'Stand up',
  vibrate: true,
  play_sound: true,
  schedule_type: 'once',
  channel: 'wakeup',
  data: {content: 'my notification id is 22'},
  loop_sound: true,
  has_button: true,
};

const repeatAlarmNotifData = {
  title: 'Alarm',
  message: 'Stand up',
  vibrate: true,
  play_sound: true,
  channel: 'wakeup',
  data: {content: 'my notification id is 22'},
  loop_sound: true,
  schedule_type: 'repeat',
  repeat_interval: 'minutely',
  interval_value: 1, // repeat after 5 minutes
};

const Home = ({navigation}) => {
  const user = useSelector(state => state.auth);
  console.log('dataUser', user);

  useEffect(() => {
    // setFutureAlarm();
    const _subscribeDismiss = RNEmitter.addListener(
      'OnNotificationDismissed',
      data => {
        const obj = JSON.parse(data);
        console.log(`notification id: ${obj.id} dismissed`);
      },
    );

    const _subscribeOpen = RNEmitter.addListener(
      'OnNotificationOpened',
      data => {
        ReactNativeAN.stopAlarmSound();
        console.log(data);
        const obj = JSON.parse(data);
        const daddr = `${obj.lat},${obj.lng}`;
        const company = Platform.OS === 'ios' ? 'apple' : 'google';
        Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
        console.log(`app opened by notification: ${obj.id}`);
      },
    );

    const _subscribeOpenQuit = RNEmitter.addListener(
      'getInitialNotification',
      data => {
        ReactNativeAN.stopAlarmSound();
        console.log(data);
        const obj = JSON.parse(data);
        const daddr = `${obj.lat},${obj.lng}`;
        const company = Platform.OS === 'ios' ? 'apple' : 'google';
        Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
        console.log(`app opened by notification: ${obj.id}`);
      },
    );

    return () => {
      _subscribeDismiss.remove();
      _subscribeOpen.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bgWrapper}>
          <Image source={IMGBGHome} style={styles.imgBG} />
          <View style={styles.avatar}>
            <View style={styles.profileWrapper}>
              <Image source={IMGLogoBulkum} style={styles.imgProfile} />
            </View>
            <Text style={styles.name}>{user.dataUser.nama || 'Anonym'}</Text>
            <Text style={styles.job}>Web Desainer</Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <View style={styles.btnMenutes}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnMenu}
              onPress={() => navigation.push('Penginapan')}>
              <ICHome />
              <Text style={styles.textMenu}>Penginapan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnMenutes}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnMenu}
              onPress={() => navigation.push('ListPesanan')}>
              <ICBook />
              <Text style={styles.textMenu}>Pesanan</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnMenutes}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnMenu}
              onPress={() => navigation.push('Wisata')}>
              <ICWisata />
              <Text style={styles.textMenu}>Wisata</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnMenutes}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnMenu}
              onPress={() => navigation.push('Kuliner')}>
              <ICKuliner />
              <Text style={styles.textMenu}>Kuliner</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnMenutes}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnMenu}
              onPress={() => navigation.push('Oleh')}>
              <ICKuliner />
              <Text style={styles.textMenu}>Oleh - Oleh</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Gap height={110} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingBottom: 150,
  },
  bgWrapper: {
    marginBottom: 23,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBG: {
    position: 'absolute',
    width: '100%',
    height: 500,
  },
  avatar: {
    alignItems: 'center',
  },
  profileWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 7,
    borderColor: 'white',
    marginBottom: 20,
  },
  imgProfile: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  name: {
    fontFamily: fonts.primary[700],
    color: 'white',
    fontSize: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.60)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },
  job: {
    fontFamily: fonts.primary[700],
    color: 'white',
    fontSize: 14,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
  },

  menuWrapper: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  btnMenutes: {
    width: '45%',
  },
  btnMenu: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 13,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F4F4F4',
  },
  textMenu: {
    marginTop: 4,
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: '#7DE1C9',
  },
});
