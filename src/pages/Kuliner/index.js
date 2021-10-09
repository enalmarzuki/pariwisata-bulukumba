import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  IMGDummyProfile,
  IMGKuliner1,
  IMGKuliner2,
  IMGPenginapan1,
  IMGPenginapan2,
  IMGWisata1,
  IMGWisata2,
} from '../../assets';
import {Card, Gap, Header, SectionTitle} from '../../components';
import {colors} from '../../utils';

export default function index({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        withAvatar
        icColor="#000000"
        title="Kuliner"
        image={IMGDummyProfile}
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          <Gap height={30} />
          <SectionTitle
            withSeeAll
            title="Rekomendasi Penginapan"
            subTitle="Lihat Semua"
            onPress={() => console.log('lihat semua')}
          />
          <Gap height={20} />
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Gap width={30} />
            <Card
              isRecommendation
              image={IMGKuliner2}
              title="Toko Marning"
              subTitle="Pantai Bira, Kel. Bira"
              onPress={() => navigation.push('DetailKuliner')}
            />
            <Card
              isRecommendation
              image={IMGKuliner2}
              title="Toko Kue Uhu”"
              subTitle="Applarang, Kel. Ara"
              onPress={() => navigation.push('DetailKuliner')}
            />
            <Card
              isRecommendation
              image={IMGKuliner2}
              title="Villa Samata"
              subTitle="Pantai Bira, Kel. Bira"
              onPress={() => navigation.push('DetailKuliner')}
            />
            <Gap width={10} />
          </ScrollView>
        </View>
        <Gap height={35} />
        <View style={styles.wrapper}>
          <SectionTitle
            withSeeAll
            title="Pengunjung Terbanyak"
            subTitle="Lihat Semua"
            onPress={() => console.log('Pengunjung Terbanyak')}
          />
          <Gap height={20} />
          <Card
            isMostVisitor
            image={IMGKuliner2}
            title="Resort Jingga"
            subTitle="Applarang, Kel. Ara"
            rating="4.8"
            onPress={() => navigation.push('DetailKuliner')}
          />
          <Card
            isMostVisitor
            image={IMGKuliner2}
            title="Villa Pelangi"
            subTitle="Pantai Bira, Kel. Bira"
            rating="4.5"
            onPress={() => navigation.push('DetailKuliner')}
          />
          <Card
            isMostVisitor
            image={IMGKuliner2}
            title="Resort Jingga"
            subTitle="Applarang, Kel. Ara"
            rating="4.8"
            onPress={() => navigation.push('DetailKuliner')}
          />
          <Card
            isMostVisitor
            image={IMGKuliner2}
            title="Villa Pelangi"
            subTitle="Pantai Bira, Kel. Bira"
            rating="4.5"
            onPress={() => navigation.push('DetailKuliner')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.container,
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 30,
  },
});
