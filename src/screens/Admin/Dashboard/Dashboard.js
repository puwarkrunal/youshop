import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helper/Metrix';
import {Colors} from '../../../constant/Colors';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Dashboard = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getAllProduct();
    getOrders();
  }, []);

  const getAllProduct = () => {
    firestore()
      .collection('products')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        setProductList(data);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  };

  const getOrders = () => {
    firestore()
      .collection('orders')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        setOrderList(data);
      })
      .catch(error => {
        console.log('Error getting orders: ', error);
      });
  };

  const renderCards = ({item, index}) => {
    const {name, description, price, qty, images} = item;
    return (
      <TouchableOpacity key={index} style={styles.card}>
        <Image source={{uri: images[0]}} style={styles.cardImg} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardText}>Name: {name}</Text>
          <Text style={styles.cardText}>Desc: {description}</Text>
          <Text style={styles.cardText}>Price: ₹ {price}</Text>
          <Text style={styles.cardText}>qty: {qty}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderOrderList = ({item, index}) => {
    return (
      <View
        style={[
          styles.orderCard,
          {borderColor: item.orderStatus == 'pending' ? 'yellow' : 'green'},
        ]}
        key={index}>
        <View>
          <Text style={{color: Colors.black}}>Name: {item.orderby}</Text>
          <Text style={{color: Colors.black}}>
            Total Products: {item.products.length}
          </Text>
          <Text style={{color: Colors.black}}>₹{item.totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.viewOrderBtn}
          onPress={() => navigation.navigate('ViewOrders', {item: item})}>
          <Text style={styles.viewOrderText}>View Order</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headingTxt}>MotiDeal Admin</Text>
        <TouchableOpacity style={styles.profileIcon} />
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab(0)}
          style={[styles.tabBtn, activeTab === 0 && styles.activeTabBtn]}>
          <Text style={{color: Colors.black}}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          style={[styles.tabBtn, activeTab === 1 && styles.activeTabBtn]}>
          <Text style={{color: Colors.black}}>Orders</Text>
        </TouchableOpacity>
      </View>
      <View>
        {activeTab === 0 ? (
          <FlatList
            data={productList}
            renderItem={renderCards}
            keyExtractor={(_, index) => index.toString()}
          />
        ) : (
          <FlatList
            data={orderList}
            renderItem={renderOrderList}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => navigation.navigate('AddProduct')}>
        <AntDesign name="plus" size={moderateScale(18)} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(60),
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(24),
  },
  headingTxt: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(18),
  },
  profileIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(15),
  },
  floatBtn: {
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'green',
    width: moderateScale(60),
    bottom: verticalScale(20),
    height: moderateScale(60),
    right: horizontalScale(20),
    borderRadius: moderateScale(30),
  },
  tabContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(12),
  },
  tabBtn: {
    width: '45%',
    alignItems: 'center',
    borderBottomWidth: 0,
    justifyContent: 'center',
    height: verticalScale(35),
  },
  activeTabBtn: {
    borderBottomWidth: 1,
  },
  card: {
    width: '90%',
    elevation: 8,
    shadowRadius: 4.65,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: moderateScale(9),
    height: verticalScale(120),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(12),
    shadowOffset: {width: 0, height: 4},
  },
  cardImg: {
    width: '35%',
    height: '100%',
    resizeMode: 'stretch',
  },
  cardTextContainer: {
    width: '60%',
  },
  cardText: {
    color: Colors.black,
    fontSize: moderateScale(14),
    marginBottom: verticalScale(6),
  },
  orderCard: {
    width: '90%',
    elevation: 5,
    borderWidth: 1,
    shadowRadius: 3.84,
    alignSelf: 'center',
    shadowOpacity: 0.25,
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(9),
    shadowColor: Colors.black,
    minHeight: verticalScale(100),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(12),
    shadowOffset: {width: 0, height: 2},
  },
  viewOrderBtn: {
    width: '30%',
    alignItems: 'center',
    padding: moderateScale(6),
  },
  viewOrderText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Dashboard;
