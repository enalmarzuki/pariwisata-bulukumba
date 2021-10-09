import React from 'react';
import {StyleSheet, Text, Touchable, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const index = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text>Selamat Datang Kembali</Text>
        <Text>Wulandari</Text>

        <View style={styles.menuWrapper}>
          <TouchableOpacity>
            <Text>Pesanan</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Kelola Kamar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text>asdsa</Text>
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
});
