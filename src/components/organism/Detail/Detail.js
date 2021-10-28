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

export default function Detail({data, urlDetail, navigation, cardNavigation}) {
  const isLoading = useSelector(state => state.detail.isLoading);
  const dataDetail = useSelector(state => state.detail.dataDetail);
  const dispatch = useDispatch();

  const getDetail = useCallback(async () => {
    return await dispatch(actionGetDetail(`${urlDetail}/${data.detail._id}`));
  }, [dispatch, urlDetail, data.detail._id]);

  useEffect(() => {
    getDetail();
  }, [getDetail]);

  const handleClickOpenMaps = () => {
    const daddr = `${data.detail.latitude},${data.detail.longitude}`;
    const company = Platform.OS === 'ios' ? 'apple' : 'google';
    Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
  };

  if (isLoading || dataDetail === '') {
    return (
      <View style={styles.emptyList}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          isJustBtnBack
          icColor="#000000"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: `${dataDetail[0]?.detail.foto}`,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.titleWrapper}>
            <View>
              <Text style={styles.title}>{dataDetail[0].detail.nama}</Text>
              <Text style={styles.subTitle}>{dataDetail[0].detail.lokasi}</Text>
            </View>
            <TouchableOpacity onPress={handleClickOpenMaps}>
              <ICMaps />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>
            {dataDetail[0].detail.deskripsi}
          </Text>
          <Gap height={25} />
          <View>
            <SectionTitle title="Hasil Yang Sama" />
            <Gap height={25} />
            <View style={styles.RoomsType}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Gap width={30} />
                {dataDetail[0].sama?.map(someResult => (
                  <Card
                    key={someResult._id}
                    // image={room.image}
                    // title={room.title}
                    // subTitle={room.subTitle}
                    data={someResult}
                    id={someResult._id}
                    onPress={() =>
                      navigation.replace(cardNavigation, {
                        id: someResult._id,
                      })
                    }
                  />
                ))}
                <Gap width={10} />
              </ScrollView>
            </View>
          </View>
        </View>
        <Gap height={25} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.container,
    flex: 1,
  },
  sectionWrapper: {
    paddingHorizontal: 30,
  },
  imageWrapper: {
    width: '100%',
    height: 466,
    overflow: 'hidden',
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
  },
  image: {
    width: '100%',
    height: 466,
  },
  titleWrapper: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 19,
    borderRadius: 10,
    position: 'relative',
    top: -40,
    shadowColor: '#ACB4BC',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontFamily: fonts.primary[800],
    fontSize: 16,
    color: colors.text.primary,
  },
  subTitle: {
    fontFamily: fonts.primary[600],
    fontSize: 12,
    color: colors.text.subTitle,
    marginTop: 3,
  },
  description: {
    fontFamily: fonts.primary.normal,
    color: colors.text.subTitle,
    marginTop: -15,
  },
  facilityWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  facility: {
    alignItems: 'center',
  },
  facilityDesc: {
    fontFamily: fonts.primary[700],
    fontSize: 14,
    color: colors.text.subTitle,
    marginTop: 14,
  },
  RoomsType: {
    marginHorizontal: -30,
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
