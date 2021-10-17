import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Gap, Header, SectionTitle} from '../..';
import {ICMaps} from '../../../assets';
import {actionGetDetail} from '../../../redux/action/detail';
import {colors, fonts} from '../../../utils';
import LodgingDetail from './LodgingDetail';
import RoomsDetail from './RoomsDetail';
import DetailPage from './Detail';

export default function Detail({
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
  urlDetail,
  isDetail,
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

  if (isDetail) {
    return (
      <DetailPage
        cardNavigation={cardNavigation}
        navigation={navigation}
        data={data}
        urlDetail={urlDetail}
      />
    );
  }

  return (
    <View>
      <Text>Detail Page Is Not Available</Text>
    </View>
  );
}
