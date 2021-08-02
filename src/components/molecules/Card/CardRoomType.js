import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, fonts} from '../../../utils';

export default function CardRoomType({onPress, image, title, subTitle}) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.cardImageWrapper}>
        <Image source={image} style={styles.cardImage} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
