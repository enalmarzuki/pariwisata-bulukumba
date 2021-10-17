import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IMGOleh1, IMGOleh2} from '../../assets';
import {Detail} from '../../components';
import {actionGetDetailOlehOleh} from '../../redux/action/olehOleh';
import {colors} from '../../utils';

const rooms = [
  {
    id: 1,
    image: IMGOleh1,
    title: 'Pantai Appalarang',
  },
  {
    id: 2,
    image: IMGOleh2,
    title: 'Pantai Ara',
  },
];

export default function DetailOleh({route, navigation}) {
  const detailOlehOleh = useSelector(
    state => state.olehOleh.dataDetailOlehOleh,
  );
  const olehOleh = useSelector(state => state.olehOleh);

  const dispatch = useDispatch();

  const getDetailKuliner = useCallback(async () => {
    return dispatch(actionGetDetailOlehOleh(route.params.id));
  }, [dispatch, route.params.id]);

  useEffect(() => {
    getDetailKuliner();
  }, [getDetailKuliner]);

  if (olehOleh.isLoading || detailOlehOleh === '') {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Detail
      isDetail
      cardNavigation="DetailOleh"
      navigation={navigation}
      urlDetail="https://skripsi-wulan.herokuapp.com/toko"
      data={detailOlehOleh[0]}
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
