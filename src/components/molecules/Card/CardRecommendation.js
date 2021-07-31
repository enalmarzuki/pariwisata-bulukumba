import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ICVilla} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function CardRecommendation({onPress, image, title, subTitle}) {
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardWrapper(orientation)}>
        <View style={styles.cardImage}>
          <Image source={image} style={styles.cardImage} />
        </View>
        <View style={styles.cardTitleWrapper}>
          <View style={styles.cardBody}>
            <ICVilla />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cardWrapper: orientation => ({
    backgroundColor: 'rgba(125, 225, 201, 0.4)',
    overflow: 'hidden',
    borderRadius: 20,
    height: 238,
    marginRight: 20,
    width:
      orientation === 'PORTRAIT'
        ? Dimensions.get('window').width - 60
        : Dimensions.get('window').width / 2 - 60,
  }),
  cardImage: {
    height: 186,
    width: '100%',
  },
  cardTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 20,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.primary[900],
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 12,
  },
  subTitle: {
    fontFamily: fonts.primary[700],
    fontSize: 12,
    color: colors.text.subTitle,
  },
});
