import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CInput from '../../../components/CInput';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SearchScreen = () => {
  const [searchTxt, setSearchTxt] = useState('');
  console.log(searchTxt, 'searchTxt');
  return (
    <SafeAreaView style={styles.container}>
      <CInput
        Icon={<AntDesign name="search1" size={18} />}
        placeholder={'Search any product.......'}
        otherStyle={styles.input}
        onChangeText={txt => setSearchTxt(txt)}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '100%',
    borderRadius: 0,
  },
});
