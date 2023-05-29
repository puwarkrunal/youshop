import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../constant/Colors';

const CButton = ({Icon, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      {Icon}
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.black,
    alignItems:'center',
    justifyContent:'center'
  },
});
