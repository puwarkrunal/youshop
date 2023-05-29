import React, {memo} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../constant/Colors';
import {backIcon} from '../asset/images';

const CHeader = memo(({secBtn}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.goBack()}>
        <Image source={backIcon} />
      </TouchableOpacity>
      {secBtn}
    </View>
  );
});

export default CHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 12,
    zIndex: 9,
    width: '100%',
  },
  headerIcon: {
    height: 35,
    width: 35,
    borderRadius: 18,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
