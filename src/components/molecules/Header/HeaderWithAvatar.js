import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICArrow} from '../../../assets';
import {colors, fonts} from '../../../utils';

export default function HeaderWithAvatar({onPress, title, image, icColor}) {
  return (
    <View style={styles.headerWrapper}>
      <View>
        <TouchableOpacity onPress={onPress}>
          <ICArrow color={icColor} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.avatar}>
        <Image
          source={image}
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: fonts.primary[800],
    fontSize: 20,
    color: colors.text.primary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
