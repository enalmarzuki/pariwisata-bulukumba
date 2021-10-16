import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IMGKamar1} from '../../assets';
import {Detail} from '../../components';
import {actionGetRoom} from '../../redux/action/kamar';

export default function DetailKamar({route, navigation}) {
  const roomData = useSelector(state => state.kamar);
  console.log('roomData', roomData);
  const dispatch = useDispatch();

  const getDetailKamar = useCallback(async () => {
    return dispatch(actionGetRoom(route.params.idKamar));
  }, [dispatch, route.params.idKamar]);

  useEffect(() => {
    getDetailKamar();
  }, [getDetailKamar]);

  return (
    <Detail isRoomDetail navigation={navigation} data={roomData.dataKamar} />
  );
}
