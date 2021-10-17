import React, {useCallback, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {actionGetRoom} from '../../../redux/action/kamar';
import {colors, fonts} from '../../../utils';
import NumberFormat from 'react-number-format';

const TextStatus = props => {
  if (props.status.toLowerCase() === 'pending') {
    return <Text style={styles.pendingStatus}>{props.status}</Text>;
  }
  return <Text style={styles.rejectStatus}>{props.status}</Text>;
};

export default function CardBooking({data, onPress}) {
  const roomData = useSelector(state => state.kamar);
  const dispatch = useDispatch();
  // console.log('roomData', roomData);

  const getDetailKamar = useCallback(async () => {
    return dispatch(actionGetRoom(data.id_kamar));
  }, [dispatch, data.id_kamar]);

  useEffect(() => {
    getDetailKamar();
  }, [getDetailKamar]);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardBook}>
        <View style={styles.cardImage}>
          <Image
            source={{
              uri: `https://skripsi-wulan.herokuapp.com/image/${roomData.dataKamar.foto}`,
            }}
            style={styles.cardImage}
          />
        </View>
        <View style={styles.cardBody}>
          <View>
            <Text style={styles.cardTitle}>{roomData.dataKamar.tipe}</Text>
            <Text style={styles.cardSubTitle}>
              {data?.masuk} - {data?.keluar}
            </Text>
            <Text style={styles.cardPrice}>
              <NumberFormat
                value={data.total}
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                prefix={'Rp. '}
                renderText={value => <Text>{value}</Text>}
              />
            </Text>
          </View>
          <View style={styles.statusBooking}>
            <TextStatus status={data.status} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardBook: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    borderRadius: 10,
    width: 83,
    height: 83,
    overflow: 'hidden',
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: fonts.primary[800],
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 5,
  },
  cardSubTitle: {
    fontFamily: fonts.primary.normal,
    fontSize: 12,
    color: colors.text.primary,
    marginBottom: 5,
  },
  cardPrice: {
    fontFamily: fonts.primary[800],
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 5,
  },
  pendingStatus: {
    fontFamily: fonts.primary.normal,
    fontSize: 12,
    backgroundColor: 'yellow',
    color: colors.text.primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  successStatus: {
    fontFamily: fonts.primary.normal,
    fontSize: 12,
    backgroundColor: colors.primary,
    color: colors.text.primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  rejectStatus: {
    fontFamily: fonts.primary.normal,
    fontSize: 12,
    backgroundColor: 'red',
    color: colors.text.primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});