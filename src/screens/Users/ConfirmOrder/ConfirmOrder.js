import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  Platform,
  FlatList,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../../constant/Colors';
import CHeader from '../../../components/CHeader';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helper/Metrix';

const {height} = Dimensions.get('window');

const ConfirmOrder = () => {
  const route = useRoute();
  const {total} = route.params;
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.items);
  const userData = useSelector(state => state.user.data);

  const [finalTotal, setFinalTotal] = useState(total);
  const [currentUser, setCurrentUser] = useState({});
  const [couponTxt, setCouponTxt] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    if (couponTxt.toUpperCase() === 'FIRST50') {
      setFinalTotal(finalTotal * 0.5);
      setCouponApplied(true);
    } else if (couponTxt.toUpperCase() === 'MOTIDEAL20') {
      setFinalTotal(finalTotal * 0.8);
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
      setFinalTotal(total);
    }
  }, [couponTxt]);

  useEffect(() => {
    firestore()
      .collection('users')
      .where('email', '==', userData.email)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          setCurrentUser(querySnapshot.docs[0].data());
        }
      });
  }, []);

  const renderCard = ({item, index}) => {
    return (
      <View key={index} style={styles.card}>
        <Image source={{uri: item.image[0]}} style={styles.img} />
        <View>
          <Text style={styles.cardText}>{item.name}</Text>
          <Text style={styles.cardText}>x{item.quantity}</Text>
          <Text style={styles.cardText}>₹{item.price}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{height: height}} nestedScrollEnabled>
        <CHeader />
        <View style={styles.section}>
          <Text style={styles.headingTitle}>Delivery Address</Text>
          {currentUser?.address ? (
            <View style={styles.addressCard}>
              <Text style={styles.cardHeading}>
                Street:{' '}
                <Text style={styles.cardText}>
                  {currentUser.address.street}
                </Text>
              </Text>
              <Text style={styles.cardHeading}>
                City:{' '}
                <Text style={styles.cardText}>{currentUser.address.city}</Text>
              </Text>
              <Text style={styles.cardHeading}>
                State:{' '}
                <Text style={styles.cardText}>{currentUser.address.state}</Text>
              </Text>
              <Text style={styles.cardHeading}>
                Phone number: <Text style={styles.cardText}>9898076543</Text>
              </Text>
              <Text style={styles.cardHeading}>
                Zip code:{' '}
                <Text style={styles.cardText}>
                  {currentUser.address.zipcode}
                </Text>
              </Text>
              <Text style={styles.cardHeading}>
                Country: <Text style={styles.cardText}>India</Text>
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate('PersonalDetails')}>
              <Text style={styles.cardText}>Add Your Address</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.headingTitle}>Product Item</Text>
          <FlatList
            data={cartData}
            renderItem={renderCard}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View
          style={[
            styles.section,
            {height: Platform.OS == 'android' ? '15%' : '10%'},
          ]}>
          <Text style={styles.headingTitle}>Promo code</Text>
          <View style={styles.promoContainer}>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons
                name="brightness-percent"
                color={Colors.white}
                size={24}
              />
            </View>
            <TextInput
              placeholder="Promo code"
              placeholderTextColor={Colors.black}
              style={styles.promoInput}
              value={couponTxt}
              maxLength={10}
              onChangeText={txt => setCouponTxt(txt)}
            />
          </View>
          {couponApplied && (
            <Text style={styles.cardText}>Successfully couponApplied</Text>
          )}
        </View>
        <View style={styles.bottomBar}>
          <View style={styles.priceWrapper}>
            <Text style={styles.priceText}>Total Price</Text>
            <Text style={styles.priceText}>₹{finalTotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            disabled={currentUser?.address ? false : true}
            onPress={() =>
              currentUser?.address
                ? navigation.navigate('ChoosePayment', {
                    total: finalTotal,
                    data: cartData,
                  })
                : Alert.alert('Add Address first')
            }>
            <Text style={styles.btnText}>Choose payment method</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: height,
    backgroundColor: Colors.white,
  },
  section: {
    height: '30%',
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(20),
  },
  headingTitle: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(20),
    marginBottom: verticalScale(6),
  },
  addressCard: {
    width: '100%',
    padding: moderateScale(12),
    marginTop: verticalScale(12),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(24),
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    justifyContent: 'center',
  },
  cardHeading: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(16),
    marginVertical: verticalScale(3),
  },
  cardText: {
    color: 'grey',
    fontWeight: '400',
    fontSize: moderateScale(16),
  },
  addBtn: {
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
    borderStyle: 'dashed',
    justifyContent: 'center',
    height: verticalScale(60),
    marginVertical: verticalScale(12),
  },
  card: {
    width: '98%',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: verticalScale(100),
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(12),
  },
  img: {
    height: '80%',
    resizeMode: 'contain',
    width: horizontalScale(100),
  },
  cardContentWrapper: {
    marginLeft: horizontalScale(12),
  },
  cardHeadingText: {
    color: Colors.black,
  },
  cardContentText: {
    color: Colors.black,
  },
  promoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: verticalScale(50),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(12),
    paddingHorizontal: horizontalScale(10),
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  iconWrapper: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(40),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(8),
    marginRight: horizontalScale(8),
  },
  promoInput: {
    width: '90%',
    color: Colors.black,
  },
  bottomBar: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: verticalScale(80),
    marginTop: verticalScale(19),
    justifyContent: 'space-between',
  },
  priceWrapper: {
    marginVertical: verticalScale(6),
  },
  priceText: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: moderateScale(18),
  },
  btn: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(50),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(10),
  },
  btnText: {
    fontWeight: '600',
    color: Colors.white,
    fontSize: moderateScale(16),
  },
});
