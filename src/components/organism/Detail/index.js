import React from 'react';
import {Text, View} from 'react-native';
import LodgingDetail from './LodgingDetail';
import RoomsDetail from './RoomsDetail';

export default function index({
  navigation,
  image,
  titleSection,
  subTitleSection,
  description,
  isLodgingDetail,
  roomsData,
  isRoomDetail,
}) {
  if (isLodgingDetail) {
    return (
      <LodgingDetail
        navigation={navigation}
        image={image}
        titleSection={titleSection}
        subTitleSection={subTitleSection}
        description={description}
        roomsData={roomsData}
      />
    );
  }

  if (isRoomDetail) {
    return <RoomsDetail navigation={navigation} image={image} />;
  }

  return (
    <View>
      <Text>Organism not available</Text>
    </View>
  );
}
