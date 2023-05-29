import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ob1, profileImg} from '../../../../asset/images';
import {Colors} from '../../../../constant/Colors';
import CInput from '../../../../components/CInput';
import CButton from '../../../../components/CButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../helper/Metrix';

const HomeScreen = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.user.data);
  const [productList, setProductList] = useState([]);

  const onBoardData = [
    {id: 1, image: ob1},
    {id: 2, image: ob1},
  ];

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    firestore()
      .collection('products')
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });
        setProductList(data);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeTxt}>Welcome,</Text>
          <Text style={styles.nameTxt}>{userData.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => navigation.navigate('Profile')}>
          <Image source={profileImg} style={styles.profileBtnImg} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchAndBtn}>
        <CInput
          placeholder={'Search......'}
          Icon={<AntDesign name="search1" size={20} color={Colors.black} />}
          onPressIn={() => navigation.navigate('Search')}
        />
        <CButton
          onPress={() => console.log('Clicked')}
          Icon={
            <MaterialIcons name="filter-list" size={26} color={Colors.white} />
          }
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.onboardContainer}>
          <FlatList
            data={onBoardData}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity key={index}>
                <Image source={item.image} style={styles.onBoardImg} />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{marginHorizontal: 25}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold', color: Colors.black}}>
              New Arrivals
            </Text>
            <TouchableOpacity>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={productList}
            extraData={productList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.card, {marginHorizontal: index == 0 ? 2 : 8}]}
                  onPress={() => navigation.navigate('Detail', {item: item})}>
                  <Image source={{uri: item.images[0]}} style={styles.proImg} />
                  <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.price}>₹{item.price}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    padding: moderateScale(9),
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(12),
  },
  profileBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(56),
    height: moderateScale(56),
    backgroundColor: '#F3F4F5',
    borderRadius: moderateScale(28),
  },
  profileBtnImg: {
    resizeMode: 'contain',
    width: moderateScale(50),
    height: moderateScale(50),
  },
  welcomeTxt: {
    fontWeight: '400',
    color: Colors.black,
    fontSize: moderateScale(18),
  },
  nameTxt: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(20),
  },
  searchAndBtn: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(19),
    justifyContent: 'space-between',
  },
  onboardContainer: {
    marginLeft: moderateScale(25),
    marginVertical: moderateScale(25),
  },
  onBoardImg: {
    resizeMode: 'stretch',
    height: verticalScale(160),
    width: horizontalScale(290),
    marginRight: horizontalScale(15),
  },
  card: {
    alignItems: 'center',
    margin: moderateScale(8),
    height: verticalScale(250),
    width: horizontalScale(180),
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  proImg: {
    marginTop: 1,
    marginBottom: verticalScale(12),
    resizeMode: 'stretch',
    height: verticalScale(170),
    width: '100%',
  },
  name: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '500',
  },
});
