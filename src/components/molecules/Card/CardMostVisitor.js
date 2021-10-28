import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICStart} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function CardMostVisitor({
  onPress,
  image,
  title,
  subTitle,
  rating,
}) {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.cardWrapper}>
        <View style={styles.cardImage}>
          <Image source={{uri: `${image}`}} style={styles.cardImage} />
        </View>
        <View style={styles.cardBody}>
          <View>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubTitle}>{subTitle}</Text>
          </View>
          <View style={styles.cardRating}>
            <Text style={styles.rating}>{rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
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
  },
  cardTitle: {
    fontFamily: fonts.primary[800],
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 5,
  },
  cardSubTitle: {
    fontFamily: fonts.primary.normal,
    fontSize: 12,
    color: colors.text.primary,
  },
  cardRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.text.primary,
    marginRight: 6,
  },
});
