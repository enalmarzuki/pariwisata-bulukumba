import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  IMGDummyProfile,
  IMGEmptyLodging,
  IMGLogoBulkum,
  IMGPenginapan1,
  IMGPenginapan2,
} from '../../assets';
import {Card, Gap, Header, SectionTitle} from '../../components';
import {actionGetPenginapan} from '../../redux/action/penginapan';
import {colors} from '../../utils';

export default function Penginapan({navigation}) {
  const penginapanList = useSelector(state => state.penginapan);
  const dispatch = useDispatch();

  console.log('penginapanList', penginapanList);

  const getPenginapan = useCallback(async () => {
    return dispatch(actionGetPenginapan());
  }, [dispatch]);

  useEffect(() => {
    getPenginapan();
  }, [getPenginapan]);

  console.log('penginapanList', penginapanList);

  if (penginapanList.isLoading || penginapanList.dataPenginapan === '') {
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
        title="Penginapan"
        image={IMGLogoBulkum}
        onPress={() => navigation.goBack()}
      />

      {penginapanList.dataPenginapan.length === 0 ? (
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
                image={penginapanList.dataPenginapan[0].foto}
                title={penginapanList.dataPenginapan[0].nama}
                subTitle={penginapanList.dataPenginapan[0].lokasi}
                onPress={() =>
                  navigation.push('DetailPenginapan', {
                    id: penginapanList.dataPenginapan[0]._id,
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
            {penginapanList.dataPenginapan?.map(penginapan => (
              <Card
                key={penginapan._id}
                isMostVisitor
                image={penginapan.foto}
                title={penginapan.nama}
                subTitle={penginapan.lokasi}
                onPress={() =>
                  navigation.push('DetailPenginapan', {
                    id: penginapan._id,
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
