import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ICAc,
  ICKulkas,
  ICMaps,
  ICTv,
  ICWifi,
  IMGKamar1,
  IMGKamar2,
  IMGPenginapan1,
} from '../../assets';
import {Card, Gap, Header, SectionTitle} from '../../components';
import {colors, fonts} from '../../utils';

export default function index({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          isJustBtnBack
          icColor="#000000"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.imageWrapper}>
          <Image source={IMGPenginapan1} style={styles.image} />
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.titleWrapper}>
            <View>
              <Text style={styles.title}>Villa Samata</Text>
              <Text style={styles.subTitle}>Pantai Bira, Kel. Bira</Text>
            </View>
            <ICMaps />
          </View>
          <Text style={styles.description}>
            Villa yang berdiri sejak tahun 2002, menawarkan fasiltias yang
            sangat lengkap dan langsung menghadap ke pantai. Telah banyak artis
            dan pejabat yang mempercayai villa kami ketika mereka sedang liburan
            ke bulukumba.
          </Text>
          <Gap height={25} />
          <View>
            <SectionTitle title="Fasilitas" />
            <View style={styles.facilityWrapper}>
              <View style={styles.facility}>
                <ICWifi />
                <Text style={styles.facilityDesc}>Wi-Fi</Text>
              </View>
              <View style={styles.facility}>
                <ICTv />
                <Text style={styles.facilityDesc}>Televisi</Text>
              </View>
              <View style={styles.facility}>
                <ICAc />
                <Text style={styles.facilityDesc}>AC</Text>
              </View>
              <View style={styles.facility}>
                <ICKulkas />
                <Text style={styles.facilityDesc}>Kulkas</Text>
              </View>
            </View>
            <Gap height={25} />
            <SectionTitle title="Tipe Kamar" />
            <Gap height={25} />
            <View style={styles.RoomsType}>
              <ScrollView horizontal>
                <Gap width={30} />
                <Card
                  isRoomType
                  image={IMGKamar1}
                  title="Kamar Reguler"
                  subTitle="Rp. 180.000 / Malam"
                />
                <Card
                  isRoomType
                  image={IMGKamar2}
                  title="Kamar Keluarga"
                  subTitle="Rp. 220.000 / Malam"
                />
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
