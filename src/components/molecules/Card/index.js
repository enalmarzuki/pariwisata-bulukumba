import React from 'react';
import {Text, View} from 'react-native';
import CardMostVisitor from './CardMostVisitor';
import CardRecommendation from './CardRecommendation';

export default function index({
  isRecommendation,
  isMostVisitor,
  onPress,
  image,
  title,
  subTitle,
  rating,
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

  return (
    <View>
      <Text>Card Is Not Available</Text>
    </View>
  );
}
