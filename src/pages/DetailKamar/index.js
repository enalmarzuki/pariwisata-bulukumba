import React from 'react';
import {IMGKamar1} from '../../assets';
import {Detail} from '../../components';

export default function index({navigation}) {
  return <Detail isRoomDetail navigation={navigation} image={IMGKamar1} />;
}
