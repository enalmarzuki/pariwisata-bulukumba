import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import CardBooking from './CardBooking';
import CardMostVisitor from './CardMostVisitor';
import CardRecommendation from './CardRecommendation';
import CardRoomType from './CardRoomType';

export default function index({
  isRecommendation,
  isMostVisitor,
  isRoomType,
  onPress,
  image,
  title,
  subTitle,
  rating,
  data,
  isBookingUser,
}) {
  // console.log('data cardsss', data);
  if (isRecommendation) {
    return (
      <CardRecommendation
        onPress={onPress}
        image={image}
        title={title}
        subTitle={subTitle}
      />
    );
  }

  if (isMostVisitor) {
    return (
      <CardMostVisitor
        onPress={onPress}
        image={image}
        title={title}
        subTitle={subTitle}
        rating={rating}
      />
    );
  }

  if (isRoomType) {
    return (
      <CardRoomType
        data={data}
        onPress={onPress}
        image={image}
        title={title}
        subTitle={subTitle}
      />
    );
  }

  if (isBookingUser) {
    return <CardBooking data={data} onPress={onPress} />;
  }

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
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
          <Text style={styles.title}>{data.nama}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
