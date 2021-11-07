import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {IMGKamar1} from '../../assets';
import {Detail} from '../../components';
import {actionGetRoom} from '../../redux/action/kamar';
import {KAMAR_DELETE} from '../../redux/type';

export default function DetailKamar({route, navigation}) {
  const roomData = useSelector(state => state.kamar);
  const dispatch = useDispatch();

  const getDetailKamar = useCallback(async () => {
    return dispatch(actionGetRoom(route.params.idKamar));
  }, [dispatch, route.params.idKamar]);

  useEffect(() => {
    getDetailKamar();
    return () => {
      console.log('unmounted');
      dispatch({type: KAMAR_DELETE, value: []});
    };
  }, [getDetailKamar, dispatch]);
  console.log('roomData', roomData);

  return (
    <Detail isRoomDetail navigation={navigation} data={roomData.dataKamar} />
  );
}
