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
  cardNavigation,
  data,
}) {
  if (isLodgingDetail) {
    return (
      <LodgingDetail
        cardNavigation={cardNavigation}
        navigation={navigation}
        data={data}
        image={image}
        titleSection={titleSection}
        subTitleSection={subTitleSection}
        description={description}
        roomsData={roomsData}
      />
    );
  }

  if (isRoomDetail) {
    return <RoomsDetail navigation={navigation} data={data} />;
  }

  return (
    <View>
      <Text>Organism not available</Text>
    </View>
  );
}
