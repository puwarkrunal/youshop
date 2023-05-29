import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../../../../constant/Colors';
import {useNavigation} from '@react-navigation/native';
import {backIcon, cartIcon} from '../../../../asset/images';
import {useDispatch, useSelector} from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
} from '../../../../redux/reducers/cartReducer';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../helper/Metrix';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.items);

  const onMin = id => {
    dispatch(decrementQuantity(id));
  };
  const onPlus = id => {
    dispatch(incrementQuantity(id));
  };

  const calculateTotal = () => {
    let total = 0;
    cartData.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const renderCard = ({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <View style={styles.cardLeft}>
          <View style={{overflow: 'hidden', borderRadius: 10}}>
            <Image source={{uri: item.image[0]}} style={styles.img} />
          </View>
          <View style={{justifyContent: 'space-between', marginLeft: 12}}>
            <View style={{width: '90%'}}>
              <Text style={styles.headingText} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={{color: Colors.black}} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
            <Text style={{color: Colors.black}}>₹{item.price}</Text>
          </View>
        </View>
        <View style={styles.qtyContainer}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onPlus(item.id)}>
            <Text style={{color: Colors.black}}>+</Text>
          </TouchableOpacity>
          <Text style={{color: Colors.black}}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => onMin(item.id)}>
            <Text style={{color: Colors.black}}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onProceed = () => {
    navigation.navigate('ConfirmOrder', {total: calculateTotal()});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}>
          <Image source={backIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={[styles.headerIcon, {backgroundColor: Colors.white}]}>
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={[styles.headingText, {marginHorizontal: 25}]}>
          My Cart
        </Text>
        <FlatList
          data={cartData}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
          // ItemSeparatorComponent={() => <View style={{borderBottomWidth: 1}} />}
          ListEmptyComponent={() => (
            <Text
              style={{
                textAlign: 'center',
                color: Colors.black,
              }}>
              Cart Is Empty
            </Text>
          )}
        />
      </View>

      <View
        style={[
          styles.bottomWrapper,
          {display: cartData.length > 0 ? 'flex' : 'none'},
        ]}>
        <View style={styles.priceWrapper}>
          <Text style={{color: 'grey', fontSize: 16}}>
            {`Total (${cartData.length} items)`}:
          </Text>
          <Text style={styles.priceText}>₹{calculateTotal().toFixed(2)}</Text>
        </View>

        {/* Proceed button */}
        <TouchableOpacity style={styles.btn} onPress={onProceed}>
          <Text style={styles.btnText}>Proceed to checkout </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: verticalScale(10),
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: moderateScale(35),
    height: moderateScale(35),
    borderRadius: moderateScale(18),
    shadowColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  listContainer: {
    marginTop: 25,
    height: '70%',
  },
  headingText: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(18),
  },
  img: {
    resizeMode: 'contain',
    width: horizontalScale(90),
    height: verticalScale(100),
  },
  qtyContainer: {
    flexDirection: 'column',
    backgroundColor: '#EEEEEE',
    borderRadius: moderateScale(20),
    width: '15%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
    height: 120,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 9,
    borderRadius: 12,
  },
  cardLeft: {
    flexDirection: 'row',
    width: '70%',
  },
  priceContainer: {
    width: '90%',
    borderWidth: 1,
    height: 150,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 24,
    borderColor: 'grey',
    padding: 12,
    justifyContent: 'center',
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: moderateScale(18),
    color: Colors.black,
  },
  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    marginVertical: 6,
  },
  btn: {
    width: '100%',
    backgroundColor: Colors.black,
    alignSelf: 'center',
    marginTop: 25,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: 'bold',
  },
  bottomWrapper: {
    marginHorizontal: 25,
    paddingTop: 10,
    height: '20%',
    justifyContent: 'flex-end',
  },
  promoContainer: {
    marginBottom: 12,
    height: 50,
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  applyBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: Colors.black,
  },
  qtyBtn: {
    overflow: 'hidden',
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
