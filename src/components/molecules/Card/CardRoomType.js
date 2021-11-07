import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import NumberFormat from 'react-number-format';

export default function CardRoomType({onPress, image, title, subTitle, data}) {
  console.log('data asdas', data);
  return (
    <TouchableOpacity
      disabled={data.sedia !== true}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardImageWrapper}>
          <Image
            source={{
              uri: `${data.foto}`,
            }}
            style={styles.cardImage}
          />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.title}>{data.tipe}</Text>
          <Text style={styles.subTitle}>
            {data.sedia ? (
              <NumberFormat
                value={data.harga}
                displayType={'text'}
                thousandSeparator="."
                decimalSeparator=","
                prefix={'Rp. '}
                renderText={value => <Text>{value}</Text>}
              />
            ) : (
              <View style={styles.notReady}>
                <Text style={styles.textNotReady}>Tidak Tersedia</Text>
              </View>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  notReady: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  textNotReady: {
    color: 'white',
    fontSize: 10,
  },
  cardWrapper: {
    height: 178,
    width: 250,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginRight: 20,
  },
  cardImageWrapper: {
    height: 137,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    height: 137,
    width: '100%',
  },
  cardBody: {
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.primary[800],
    fontSize: 12,
    color: colors.text.primary,
  },
  subTitle: {
    fontFamily: fonts.primary[700],
    fontSize: 10,
    color: colors.text.subTitle,
  },
});
