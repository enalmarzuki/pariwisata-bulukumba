/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useRef} from 'react';
import {StyleSheet, Text, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

const index = () => {
  const [initialPage, setInitialPage] = useState(0);
  const ref = useRef();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text>Selamat Datang Kembali</Text>
        <Text>Wulandari</Text>

        <View style={styles.menuWrapper}>
          <TouchableOpacity
            style=""
            onPress={() => {
              setInitialPage(0);
              ref.current.setPage(0);
            }}>
            <Text>Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setInitialPage(1);
              ref.current.setPage(1);
            }}>
            <Text>Kelola Kamar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PagerView
        style={styles.pagerView}
        initialPage={initialPage}
        ref={ref}
        onPageSelected={e => setInitialPage(e.nativeEvent.position)}>
        <View key="1">
          <Text>First page</Text>
        </View>
        <View key="2">
          <Text>Second page</Text>
        </View>
      </PagerView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    padding: 30,
  },
  headerWrapper: {
    backgroundColor: '#7DE1C9',
    marginHorizontal: -30,
    marginTop: -30,
    padding: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 43,
  },
  pagerView: {
    flex: 1,
  },
});
