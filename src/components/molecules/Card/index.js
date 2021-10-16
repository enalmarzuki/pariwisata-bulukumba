import React from 'react';
import {Text, View} from 'react-native';
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
    <View>
      <Text>Card Is Not Available</Text>
    </View>
  );
}
