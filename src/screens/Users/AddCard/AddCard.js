import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../constant/Colors';
import CHeader from '../../../components/CHeader';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helper/Metrix';
import CInput from '../../../components/CInput';

const AddCard = () => {
  const [cardCvv, setCardCvv] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardHName, setCardHName] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const formatCardNumber = number => {
    const cleanedNumber = number.replace(/[^0-9]/g, '');
    const formattedNumber = cleanedNumber.replace(/\d{4}(?=.)/g, '$& ');
    return formattedNumber;
  };

  const handleCardNumberChange = number => {
    const formattedNumber = formatCardNumber(number);
    setCardNumber(formattedNumber);
  };

  const formateDate = number => {
    const cleanedNumber = number.replace(/[^0-9]/g, '');
    const formattedNumber = cleanedNumber.replace(/\d{2}(?=.)/g, '$&/');
    return formattedNumber;
  };

  const handleDate = number => {
    const formattedDate = formateDate(number);
    setCardDate(formattedDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CHeader />
      <Text style={styles.heading}>Add Card</Text>
      <View style={styles.topCard} />
      <View style={styles.card}>
        <Text style={styles.visaTxt}>VISA</Text>
        <Text style={styles.labelTxt}>Card Number</Text>
        <Text
          style={{
            color: cardNumber ? Colors.white : 'grey',
            fontSize: moderateScale(20),
          }}>
          {cardNumber ? cardNumber : '1234 5678 9012 3456'}
        </Text>
        <View style={styles.row}>
          <View style={{width: '50%'}}>
            <Text style={styles.labelTxt}>CARD HOLDER NAME</Text>
            <Text
              style={{
                color: cardHName ? Colors.white : 'grey',
                fontSize: moderateScale(16),
              }}>
              {cardHName ? cardHName : 'Jhon Doe'}
            </Text>
          </View>

          <View style={{marginRight: horizontalScale(24)}}>
            <Text style={styles.labelTxt}>Valid Thru</Text>
            <Text
              style={{
                color: cardDate ? Colors.white : 'grey',
                fontSize: moderateScale(16),
              }}>
              {cardDate ? cardDate : '24/23'}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.heading}>Card Details</Text>
        <View>
          <CInput
            placeholder={'Enter Card Holder Name'}
            otherStyle={{margin: moderateScale(6)}}
            onChangeText={txt => setCardHName(txt)}
          />
          <CInput
            placeholder={'Enter Card Number'}
            otherStyle={{margin: moderateScale(6)}}
            onChangeText={handleCardNumberChange}
            maxLength={16}
            keyboardType="number-pad"
          />
          <CInput
            placeholder={'Enter Exp Date'}
            otherStyle={{margin: moderateScale(6)}}
            maxLength={4}
            onChangeText={handleDate}
            keyboardType="number-pad"
          />
          {/* <CInput
            placeholder={'Enter CVV'}
            otherStyle={{margin: 6}}
            onChangeText={txt => setCardCvv(txt)}
          /> */}
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontWeight: 'bold',
    color: Colors.black,
    margin: moderateScale(20),
    fontSize: moderateScale(20),
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    padding: moderateScale(19),
    height: verticalScale(180),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(19),
  },
  topCard: {
    width: '82%',
    alignSelf: 'center',
    backgroundColor: 'blue',
    height: verticalScale(25),
    borderTopRightRadius: moderateScale(19),
    borderTopLeftRadius: moderateScale(19),
  },
  visaTxt: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: moderateScale(20),
  },
  labelTxt: {
    color: Colors.white,
    textTransform: 'uppercase',
    marginTop: verticalScale(8),
    fontSize: moderateScale(12),
  },
  input: {
    color: Colors.white,
    height: verticalScale(40),
    fontSize: moderateScale(18),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(40),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(12),
  },
  btnText: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: moderateScale(18),
  },
});
