import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {
  ICHome,
  ICKuliner,
  ICWisata,
  IMGBGHome,
  IMGDummyProfile,
} from '../../assets';
import {Gap} from '../../components/atoms';
import {fonts} from '../../utils';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bgWrapper}>
          <Image source={IMGBGHome} style={styles.imgBG} />
          <View style={styles.avatar}>
            <View style={styles.profileWrapper}>
              <Image source={IMGDummyProfile} style={styles.imgProfile} />
            </View>
            <Text style={styles.name}>Joanna Alexa</Text>
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
    width: '100%',
    height: '100%',
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
