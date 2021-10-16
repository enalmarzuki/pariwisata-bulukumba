import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IMGEmptyLodging} from '../../assets';
import {Card, Gap, Header} from '../../components';
import {actionGetListPesananUser} from '../../redux/action/pesananUser';
import {colors} from '../../utils';

const ListBooking = ({navigation}) => {
  const bookingList = useSelector(state => state.pesananUser);
  const dataUser = useSelector(state => state.auth.dataUser);
  console.log('dataUser', dataUser);
  const dispatch = useDispatch();

  console.log('bookingList', bookingList);

  const getListBook = useCallback(async () => {
    return dispatch(actionGetListPesananUser(dataUser.id));
  }, [dispatch, dataUser.id]);

  useEffect(() => {
    getListBook();
  }, [getListBook]);

  if (bookingList.isLoading) {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        icColor="#000000"
        title="Pesanan"
        onPress={() => navigation.goBack()}
      />
      <Gap height={30} />

      {bookingList.dataListPesanan.length === 0 ? (
        <View style={styles.emptyList}>
          <Image source={IMGEmptyLodging} style={styles.imageEmptyLodging} />
          <Text>Oopss! Anda belum memiliki pesanan </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity>
            <View style={styles.wrapper}>
              {bookingList.dataListPesanan?.map(pesanan => (
                <Card
                  key={pesanan._id}
                  isBookingUser
                  data={pesanan}
                  onPress={() =>
                    navigation.push('KonfirmasiPembayaran', {
                      idPesanan: pesanan._id,
                    })
                  }
                />
              ))}
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ListBooking;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.container,
    flex: 1,
  },

  wrapper: {
    paddingHorizontal: 30,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmptyLodging: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
});
