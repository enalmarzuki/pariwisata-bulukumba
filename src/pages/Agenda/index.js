import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dialog, TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  ICArrow,
  ICCalendarGreen,
  ICLocation,
  ICLocationGreen,
  ICPlus,
  IMGEmptyLodging,
} from '../../assets';
import {Gap} from '../../components';
import {actionGetAgenda} from '../../redux/action/agenda';
import {colors, fonts} from '../../utils';

const Agenda = ({navigation}) => {
  const userID = useSelector(state => state.auth.dataUser.id);
  const agendaList = useSelector(state => state.agenda);
  const dispatch = useDispatch();
  console.log('agendaList', agendaList);

  const getAgenda = useCallback(async () => {
    return dispatch(actionGetAgenda(userID));
  }, [dispatch, userID]);

  const handleClickOpenMaps = (lat, long) => {
    const daddr = `${lat},${long}`;
    const company = Platform.OS === 'ios' ? 'apple' : 'google';
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  };

  useEffect(() => {
    getAgenda();
  }, [getAgenda]);

  if (agendaList.isLoading || agendaList.dataAgenda === '') {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.btnBackWrapper}>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => navigation.goBack()}>
              <ICArrow color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleHeaderWrapper}>
            <Text style={styles.titleHeader}>Agenda Hari Ini.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MyModal')}>
              <ICPlus />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          {agendaList.dataAgenda.length === 0 ? (
            <View style={styles.emptyList}>
              <Image
                source={IMGEmptyLodging}
                style={styles.imageEmptyLodging}
              />
              <Text>Oopss! Anda tidak memiliki agenda </Text>
            </View>
          ) : (
            <>
              {agendaList.dataAgenda?.map(item => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() =>
                    handleClickOpenMaps(
                      item.lokasi.latitude,
                      item.lokasi.longitude,
                    )
                  }>
                  <View style={styles.cardWrapper}>
                    <View style={styles.cardBody}>
                      <View style={styles.descWrapper}>
                        <ICLocationGreen color="#7DE1C9" />
                        <Text style={styles.title}>{item.lokasi?.nama}</Text>
                      </View>
                      <View style={styles.descWrapper}>
                        <ICCalendarGreen color="#7DE1C9" />
                        <Text style={styles.desc}>{item.lokasi?.lokasi}</Text>
                      </View>
                    </View>
                    <Text style={styles.time}>{item.jam}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Agenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  header: {
    backgroundColor: '#7DE1C9',
    padding: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    marginBottom: 25,
  },
  btnBackWrapper: {
    width: 40,
    height: 40,
    marginBottom: 40,
  },
  btnBack: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF75',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingHorizontal: 30,
    marginBottom: 120,
  },
  titleHeaderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleHeader: {
    fontFamily: fonts.primary[900],
    fontSize: 24,
    color: 'white',
  },
  cardWrapper: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardBody: {},
  descWrapper: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.primary[700],
    fontSize: 18,
    marginLeft: 12,
  },
  desc: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: '#8A8A8A',
    marginLeft: 12,
  },
  time: {
    fontFamily: fonts.primary[700],
    fontSize: 18,
    color: '#2B2B2B',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmptyLodging: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});
