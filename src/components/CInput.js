import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from '../constant/Colors';

const CInput = ({
  value,
  onChangeText,
  placeholder,
  Icon,
  otherStyle,
  ...props
}) => {
  return (
    <View style={[styles.inputContainer, otherStyle]}>
      {Icon}
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        onChangeText={onChangeText}
        style={[styles.input, {width: Icon ? '80%' : '90%'}]}
        {...props}
      />
    </View>
  );
};

export default CInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#F3F4F5',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: 30,
    padding: 9,
    justifyContent: 'space-evenly',
  },
  input: {
    padding: 9,
    color: Colors.black,
  },
});
