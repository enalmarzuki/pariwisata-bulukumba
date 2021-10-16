import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {IMGKamar1, IMGKamar2, IMGPenginapan1} from '../../assets';
import {Detail} from '../../components';
import {actionGetDetailPenginapan} from '../../redux/action/penginapan';
import {colors} from '../../utils';

const rooms = [
  {
    id: 1,
    image: IMGKamar1,
    title: 'Kamar Reguler',
    subTitle: 'Rp. 180.000 / Malam',
  },
  {
    id: 2,
    image: IMGKamar2,
    title: 'Kamar Keluarga',
    subTitle: 'Rp. 220.000 / Malam',
  },
];

export default function DetailPenginapan({route, navigation}) {
  console.log('route', route);

  const detailPenginapan = useSelector(
    state => state.penginapan.dataDetailPenginapan,
  );
  const penginapan = useSelector(state => state.penginapan);
  const dispatch = useDispatch();

  const getDetailPenginapan = useCallback(async () => {
    return dispatch(actionGetDetailPenginapan(route.params.id));
  }, [dispatch, route.params.id]);

  useEffect(() => {
    getDetailPenginapan();
  }, [getDetailPenginapan]);

  if (penginapan.isLoading) {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Detail
      isLodgingDetail
      cardNavigation="DetailKamar"
      navigation={navigation}
      data={detailPenginapan}
      // image={IMGPenginapan1}
      // titleSection={detailPenginapan.nama}
      // subTitleSection={detailPenginapan.lokasi}
      // description={detailPenginapan.deskripsi}
      // roomsData={rooms}
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
