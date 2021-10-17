import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IMGPenginapan1, IMGWisata1, IMGWisata2} from '../../assets';
import {Detail} from '../../components';
import {actionGetDetailWisata} from '../../redux/action/wisata';
import {colors} from '../../utils';

const rooms = [
  {
    id: 1,
    image: IMGWisata1,
    title: 'Pantai Appalarang',
  },
  {
    id: 2,
    image: IMGWisata2,
    title: 'Pantai Ara',
  },
];

export default function DetailWisata({route, navigation}) {
  console.log('route', route);

  const detailWisata = useSelector(state => state.wisata.dataDetailWisata);
  const wisata = useSelector(state => state.wisata);

  console.log('wisata asdzxcweq', wisata);
  console.log('detailWisata[0000asdsad]', detailWisata);

  const dispatch = useDispatch();

  const getDetailWisata = useCallback(async () => {
    return dispatch(actionGetDetailWisata(route.params.id));
  }, [dispatch, route.params.id]);

  useEffect(() => {
    getDetailWisata();
  }, [getDetailWisata]);

  if (wisata.isLoading || detailWisata === '') {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    // <Text>assad</Text>
    <Detail
      isDetail
      cardNavigation="DetailWisata"
      navigation={navigation}
      urlDetail="https://skripsi-wulan.herokuapp.com/wisata"
      data={detailWisata[0]}
    />
  );
}

const styles = StyleSheet.create({
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
