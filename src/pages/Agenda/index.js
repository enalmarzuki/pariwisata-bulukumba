import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Dialog, TextInput} from 'react-native-paper';
import {
  ICArrow,
  ICCalendarGreen,
  ICLocation,
  ICLocationGreen,
  ICPlus,
} from '../../assets';
import {Gap} from '../../components';
import {fonts} from '../../utils';

const Agenda = ({navigation}) => {
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
          <View style={styles.cardWrapper}>
            <View style={styles.cardBody}>
              <View style={styles.descWrapper}>
                <ICLocationGreen color="#7DE1C9" />
                <Text style={styles.title}>Kampoeng Nelayan</Text>
              </View>
              <View style={styles.descWrapper}>
                <ICCalendarGreen color="#7DE1C9" />
                <Text style={styles.desc}>Applarang, Kel. Ara</Text>
              </View>
            </View>
            <Text style={styles.time}>12.30</Text>
          </View>
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
});
