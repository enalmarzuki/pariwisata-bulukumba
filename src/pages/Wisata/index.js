import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IMGDummyProfile, IMGEmptyLodging, IMGLogoBulkum} from '../../assets';
import {Card, Gap, Header, SectionTitle} from '../../components';
import {actionGetWisata} from '../../redux/action/wisata';
import {colors} from '../../utils';

export default function Wisata({navigation}) {
  const wisataList = useSelector(state => state.wisata);
  const dispatch = useDispatch();

  console.log('wisataList', wisataList);

  const getWisata = useCallback(async () => {
    return dispatch(actionGetWisata());
  }, [dispatch]);

  useEffect(() => {
    getWisata();
  }, [getWisata]);

  if (wisataList.isLoading) {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        withAvatar
        icColor="#000000"
        title="Wisata"
        image={IMGLogoBulkum}
        onPress={() => navigation.goBack()}
      />

      {wisataList.dataWisata.length === 0 ? (
        <View style={styles.emptyList}>
          <Image source={IMGEmptyLodging} style={styles.imageEmptyLodging} />
          <Text>Oopss! Penginapan tidak tersedia </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <Gap height={30} />
            <SectionTitle title="Rekomendasi Penginapan" />
            <Gap height={20} />
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Gap width={30} />
              <Card
                isRecommendation
                image={wisataList.dataWisata[0].foto}
                title={wisataList.dataWisata[0].nama}
                subTitle={wisataList.dataWisata[0].lokasi}
                onPress={() =>
                  navigation.push('DetailWisata', {
                    id: wisataList.dataWisata[0]._id,
                  })
                }
              />
              <Gap width={10} />
            </ScrollView>
          </View>
          <Gap height={35} />
          <View style={styles.wrapper}>
            <SectionTitle title="Pengunjung Terbanyak" />
            <Gap height={20} />
            {wisataList.dataWisata?.map(wisata => (
              <Card
                key={wisata._id}
                isMostVisitor
                image={wisata.foto}
                title={wisata.nama}
                subTitle={wisata.lokasi}
                onPress={() =>
                  navigation.push('DetailWisata', {
                    id: wisata._id,
                  })
                }
              />
            ))}
          </View>
        </ScrollView>
      )}
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
