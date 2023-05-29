import React from 'react';
import {Colors} from '../../../../constant/Colors';
import CHeader from '../../../../components/CHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {moderateScale} from '../../../../helper/Metrix';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';

const NotificationScreen = () => {
  const secBtn = (
    <TouchableOpacity style={styles.btn}>
      <Entypo
        name={'dots-three-vertical'}
        size={moderateScale(18)}
        color={Colors.black}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CHeader secBtn={secBtn} />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  btn: {
    height: moderateScale(35),
    width: moderateScale(35),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.white,
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
