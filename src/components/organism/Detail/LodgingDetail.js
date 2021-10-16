import React from 'react';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ICAc, ICKulkas, ICMaps, ICTv, ICWifi} from '../../../assets';
import {colors, fonts} from '../../../utils';
import {Gap} from '../../atoms';
import {Card, Header, SectionTitle} from '../../molecules';

export default function index({
  navigation,
  image,
  titleSection,
  subTitleSection,
  description,
  roomsData,
  cardNavigation,
  data,
}) {
  console.log('data', data);

  const handleClickOpenMaps = () => {
    const daddr = `${data.latitude},${data.longitude}`;
    const company = Platform.OS === 'ios' ? 'apple' : 'google';
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          isJustBtnBack
          icColor="#000000"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: `https://skripsi-wulan.herokuapp.com/image/${data.foto}`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.titleWrapper}>
            <View>
              <Text style={styles.title}>{data.nama}</Text>
              <Text style={styles.subTitle}>{data.lokasi}</Text>
            </View>
            <TouchableOpacity onPress={handleClickOpenMaps}>
              <ICMaps />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{data.deskripsi}</Text>
          <Gap height={25} />
          <View>
            <SectionTitle title="Tipe Kamar" />
            <Gap height={25} />
            <View style={styles.RoomsType}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Gap width={30} />
                {data.kamar?.map(room => (
                  <Card
                    key={room._id}
                    isRoomType
                    // image={room.image}
                    // title={room.title}
                    // subTitle={room.subTitle}
                    data={room}
                    onPress={() =>
                      navigation.push(cardNavigation, {
                        idKamar: room._id,
                      })
                    }
                  />
                ))}
                <Gap width={10} />
              </ScrollView>
            </View>
          </View>
        </View>
        <Gap height={25} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.container,
    flex: 1,
  },
  sectionWrapper: {
    paddingHorizontal: 30,
  },
  imageWrapper: {
    width: '100%',
    height: 466,
    overflow: 'hidden',
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  image: {
    width: '100%',
    height: 466,
  },
  titleWrapper: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 19,
    borderRadius: 10,
    position: 'relative',
    top: -40,
    shadowColor: '#ACB4BC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontFamily: fonts.primary[800],
    fontSize: 16,
    color: colors.text.primary,
  },
  subTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 12,
    color: colors.text.subTitle,
    marginTop: 3,
  },
  description: {
    fontFamily: fonts.primary.normal,
    color: colors.text.subTitle,
    marginTop: -15,
  },
  facilityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  facility: {
    alignItems: 'center',
  },
  facilityDesc: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.text.subTitle,
    marginTop: 14,
  },
  RoomsType: {
    marginHorizontal: -30,
  },
});
