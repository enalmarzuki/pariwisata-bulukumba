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
  IMGKuliner2,
  IMGLogoBulkum,
  IMGOleh1,
  IMGOleh2,
} from '../../assets';
import {Card, Gap, Header, SectionTitle} from '../../components';
import {actionGetOlehOleh} from '../../redux/action/olehOleh';
import {colors} from '../../utils';

export default function OlehOleh({navigation}) {
  const olehOlehList = useSelector(state => state.olehOleh);
  const dispatch = useDispatch();

  console.log('olehOlehList', olehOlehList);

  const getOlehOleh = useCallback(async () => {
    return dispatch(actionGetOlehOleh());
  }, [dispatch]);

  useEffect(() => {
    getOlehOleh();
  }, [getOlehOleh]);

  if (olehOlehList.isLoading) {
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
        title="Oleh - Oleh"
        image={IMGLogoBulkum}
        onPress={() => navigation.goBack()}
      />

      {olehOlehList.dataOlehOleh.length === 0 ? (
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
                image={olehOlehList.dataOlehOleh[0].foto}
                title={olehOlehList.dataOlehOleh[0].nama}
                subTitle={olehOlehList.dataOlehOleh[0].lokasi}
                onPress={() =>
                  navigation.push('DetailOleh', {
                    id: olehOlehList.dataOlehOleh[0]._id,
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
            {olehOlehList.dataOlehOleh?.map(oleh => (
              <Card
                key={oleh._id}
                isMostVisitor
                image={oleh.foto}
                title={oleh.nama}
                subTitle={oleh.lokasi}
                onPress={() =>
                  navigation.push('DetailOleh', {
                    id: oleh._id,
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
