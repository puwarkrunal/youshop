import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../../constant/Colors';
import {profileImg} from '../../../../asset/images';
import {useDispatch, useSelector} from 'react-redux';
import CHeader from '../../../../components/CHeader';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {storeUser} from '../../../../redux/reducers/userReducer';
import {clearCart} from '../../../../redux/reducers/cartReducer';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState({});
  const userData = useSelector(state => state.user.data);

  const logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login');
        dispatch(storeUser({}));
        dispatch(clearCart());
      });
  };

  useEffect(() => {
    firestore()
      .collection('users')
      .where('email', '==', userData.email)
      .get()
      .then(querySnapshot => {
        if (!querySnapshot.empty) {
          console.log(querySnapshot.docs[0].data());
          setCurrentUser(querySnapshot.docs[0].data());
        }
      });
  }, []);

  const CBtn = ({imgView, name, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.mainBtnContainer}>
        <View style={styles.imgandName}>
          <View style={styles.btnImgContainer}>{imgView}</View>
          <Text style={styles.btnName}>{name}</Text>
        </View>
        <AntDesign name="right" color={Colors.black} size={16} />
      </TouchableOpacity>
    );
  };

  const secBtn = (
    <TouchableOpacity style={styles.btn}>
      <AntDesign name={'setting'} size={18} color={Colors.black} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CHeader secBtn={secBtn} />

      <View style={styles.profileCard}>
        <View style={styles.imgContainer}>
          <Image source={profileImg} />
        </View>

        <View>
          <Text style={styles.name}>{currentUser?.name}</Text>
          <Text style={styles.email}>{currentUser?.email}</Text>
        </View>

        <TouchableOpacity onPress={logout}>
          <AntDesign name="logout" color={Colors.black} size={16} />
        </TouchableOpacity>
      </View>

      <View style={styles.box}>
        <CBtn
          name={'Personal Details'}
          imgView={<AntDesign name="user" size={18} color={Colors.black} />}
          onPress={() => navigation.navigate('PersonalDetails')}
        />
        <CBtn
          name={'My Order'}
          imgView={
            <AntDesign name="shoppingcart" size={18} color={Colors.black} />
          }
          onPress={() => navigation.navigate('MyOrder')}
        />
        <CBtn
          name={'My Favourites'}
          imgView={<AntDesign name="heart" size={18} color={Colors.black} />}
        />
        <CBtn
          name={'My Card'}
          imgView={
            <AntDesign name="creditcard" size={18} color={Colors.black} />
          }
          onPress={() => navigation.navigate('AddCard')}
        />
        <CBtn
          name={'Setting'}
          imgView={<AntDesign name="setting" size={18} color={Colors.black} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  btn: {
    height: 35,
    width: 35,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  profileCard: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 10,
    backgroundColor: Colors.white,
    height: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  imgContainer: {
    height: 60,
    width: 60,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ededed',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  email: {
    fontSize: 14,
    fontWeight: '400',
    color: 'grey',
  },
  box: {
    borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginTop: 24,
    padding: 12,
    borderRadius: 12,
    height: 'auto',
  },
  mainBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  btnImgContainer: {
    height: 40,
    width: 40,
    backgroundColor: '#ededed',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnName: {
    fontWeight: '600',
    color: Colors.black,
    fontSize: 16,
    marginLeft: 8,
  },
  imgandName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
