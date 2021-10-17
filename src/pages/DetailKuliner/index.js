import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IMGKuliner1, IMGKuliner2} from '../../assets';
import {Detail} from '../../components';
import {actionGetDetailKuliner} from '../../redux/action/kuliner';
import {colors} from '../../utils';

const rooms = [
  {
    id: 1,
    image: IMGKuliner1,
    title: 'Pantai Appalarang',
  },
  {
    id: 2,
    image: IMGKuliner2,
    title: 'Pantai Ara',
  },
];

export default function DetailKuliner({route, navigation}) {
  const detailKuliner = useSelector(state => state.kuliner.dataDetailKuliner);
  const kuliner = useSelector(state => state.kuliner);

  const dispatch = useDispatch();

  const getDetailKuliner = useCallback(async () => {
    return dispatch(actionGetDetailKuliner(route.params.id));
  }, [dispatch, route.params.id]);

  useEffect(() => {
    getDetailKuliner();
  }, [getDetailKuliner]);

  if (kuliner.isLoading || detailKuliner === '') {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Detail
      isDetail
      cardNavigation="DetailKuliner"
      navigation={navigation}
      urlDetail="https://skripsi-wulan.herokuapp.com/kuliner"
      data={detailKuliner[0]}
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
