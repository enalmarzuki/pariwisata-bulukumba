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
import {
  IMGDummyProfile,
  IMGEmptyLodging,
  IMGKuliner1,
  IMGKuliner2,
  IMGPenginapan1,
  IMGPenginapan2,
  IMGWisata1,
  IMGWisata2,
} from '../../assets';
import {Card, Gap, Header, SectionTitle} from '../../components';
import {actionGetKuliner} from '../../redux/action/kuliner';
import {colors} from '../../utils';

export default function Kuliner({navigation}) {
  const kulinerList = useSelector(state => state.kuliner);
  const dispatch = useDispatch();

  console.log('kulinerList', kulinerList);

  const getWisata = useCallback(async () => {
    return dispatch(actionGetKuliner());
  }, [dispatch]);

  useEffect(() => {
    getWisata();
  }, [getWisata]);

  if (kulinerList.isLoading) {
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
        title="Kuliner"
        image={IMGDummyProfile}
        onPress={() => navigation.goBack()}
      />

      {kulinerList.dataKuliner.length === 0 ? (
        <View style={styles.emptyList}>
          <Image source={IMGEmptyLodging} style={styles.imageEmptyLodging} />
          <Text>Oopss! Penginapan tidak tersedia </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapper}>
            <Gap height={30} />
            <SectionTitle title="Rekomendasi Kuliner" />
            <Gap height={20} />
          </View>
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Gap width={30} />
              <Card
                isRecommendation
                image={kulinerList.dataKuliner[0].foto}
                title={kulinerList.dataKuliner[0].nama}
                subTitle={kulinerList.dataKuliner[0].lokasi}
                onPress={() =>
                  navigation.push('DetailKuliner', {
                    id: kulinerList.dataKuliner[0]._id,
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
            {kulinerList.dataKuliner?.map(kuliner => (
              <Card
                key={kuliner._id}
                isMostVisitor
                image={kuliner.foto}
                title={kuliner.nama}
                subTitle={kuliner.lokasi}
                onPress={() =>
                  navigation.push('DetailKuliner', {
                    id: kuliner._id,
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
