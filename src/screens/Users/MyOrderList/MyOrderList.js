import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import CHeader from '../../../components/CHeader';
import {Colors} from '../../../constant/Colors';
import {moderateScale, verticalScale} from '../../../helper/Metrix';
import {useSelector} from 'react-redux';

const MyOrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const userData = useSelector(state => state.user.data);

  useEffect(() => {
    const fetchOrders = async () => {
      const querySnapshot = await firestore().collection('orders').get();
      const data = querySnapshot.docs.map(doc => doc.data());
      const filteredData = data.filter(
        item => item.contactInfo === userData.email,
      );
      setOrderList(filteredData);
    };

    fetchOrders();
  }, []);

  const renderCard = ({item, index}) => {
    return (
      <View key={index} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardPrice}>₹{item.totalPrice}</Text>
          <Text
            style={[
              styles.cardStatus,
              {
                backgroundColor:
                  item.orderStatus === 'pending' ? 'yellow' : null,
              },
            ]}>
            {item.orderStatus}
          </Text>
        </View>
        <View>
          {item.products.map((product, index) => (
            <View key={index} style={styles.productContainer}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>
                  {product.description.slice(0, 30) + '...'}
                </Text>
                <Text style={styles.productQty}>qty: x{product.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CHeader />

      <View style={styles.headerContainer}>
        <Text style={styles.heading}>My Orders</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.btn, activeTab === 0 ? styles.activeBtn : null]}
            onPress={() => setActiveTab(0)}>
            <Text
              style={[
                styles.btnTxt,
                activeTab === 0 ? styles.activeBtnTxt : styles.inactiveText,
              ]}>
              ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, activeTab === 1 ? styles.activeBtn : null]}
            onPress={() => setActiveTab(1)}>
            <Text
              style={[
                styles.btnTxt,
                activeTab === 1 ? styles.activeBtnTxt : styles.inactiveText,
              ]}>
              completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={orderList}
        renderItem={renderCard}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default MyOrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    margin: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: moderateScale(18),
    color: Colors.black,
    fontWeight: 'bold',
  },
  btn: {
    borderWidth: 1,
    padding: moderateScale(4),
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(6),
    height: verticalScale(35),
  },
  btnTxt: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  activeBtn: {
    backgroundColor: 'black',
  },
  activeBtnTxt: {
    color: Colors.white,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    padding: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginVertical: verticalScale(12),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
  },
  cardPrice: {
    color: Colors.black,
  },
  cardStatus: {
    padding: 4,
    textTransform: 'uppercase',
    color: Colors.black,
  },
  productContainer: {
    marginVertical: 12,
    flexDirection: 'row',
  },
  productImage: {
    height: 100,
    width: 100,
  },
  productDetails: {
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
    color: Colors.black,
  },
  productDescription: {
    width: '90%',
    color: Colors.black,
  },
  productQty: {
    color: Colors.black,
  },
  inactiveText:{
    color:Colors.black
  }
});
