import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../../constant/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import CHeader from '../../../components/CHeader';
import {clearCart} from '../../../redux/reducers/cartReducer';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helper/Metrix';

const CButton = React.memo(({name, iconName, onPress}) => {
  return (
    <TouchableOpacity style={styles.payBtn} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.iconContainer}>{iconName}</View>
        <Text style={{color: Colors.black}}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
});

const ChoosePayment = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {total, data} = route.params;

  const cartData = useSelector(state => state.cart.items);
  const userData = useSelector(state => state.user.data);

  const onCash = useCallback(() => {
    const data = {
      orderDate: new Date(),
      products: cartData,
      totalPrice: total,
      orderStatus: 'pending',
      paymentType: 'CASH',
      orderby: userData.name,
      address: userData.address,
      contactInfo: userData.email,
    };

    firestore()
      .collection('orders')
      .add(data)
      .then(() => {
        console.log('Order added to admin list');
        navigation.replace('MyOrder');
        dispatch(clearCart());
      });
  }, [
    cartData,
    dispatch,
    navigation,
    total,
    userData.address,
    userData.email,
    userData.name,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <CHeader />
      <View
        style={{marginLeft: horizontalScale(25), marginTop: verticalScale(12)}}>
        <Text style={styles.headingTitle}>Payment</Text>
      </View>

      <View>
        <CButton
          name={'Credit card'}
          iconName={
            <AntDesign
              name="creditcard"
              size={moderateScale(18)}
              color={Colors.white}
            />
          }
        />

        <CButton
          name={'Visa'}
          iconName={
            <Fontisto
              name="visa"
              size={moderateScale(18)}
              color={Colors.white}
            />
          }
        />
        <CButton
          name={'Google pay'}
          iconName={
            <FontAwesome5Pro
              name="google-pay"
              size={moderateScale(18)}
              color={Colors.white}
            />
          }
        />
        <CButton
          name={'Cash on delivery'}
          iconName={
            <FontAwesome5Pro
              name="google-pay"
              size={moderateScale(18)}
              color={Colors.white}
            />
          }
          onPress={onCash}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChoosePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(40),
    height: moderateScale(40),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(20),
  },
  headingTitle: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(20),
    marginBottom: moderateScale(6),
  },
  payBtn: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    height: verticalScale(60),
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(8),
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: 'grey',
    justifyContent: 'center',
    width: moderateScale(40),
    height: moderateScale(40),
    marginRight: moderateScale(8),
    borderRadius: moderateScale(30),
  },
});
