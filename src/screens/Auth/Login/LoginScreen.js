import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logo} from '../../../asset/images';
import {TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../../constant/Colors';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';
import {storeUser} from '../../../redux/reducers/userReducer';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const AdminEmail = 'kapuwar29@gmail.com';

  useEffect(() => {
    auth().currentUser != null &&
      (auth().currentUser.email === AdminEmail
        ? navigation.replace('Dashboard')
        : navigation.replace('Tab'));
  });

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setName('');
    setEmail('');
    setPassword('');
  }, [activeTab]);

  const getAllUsers = async () => {
    firestore()
      .collection('users')
      .get()
      .then(res => {
        let alldata = [];
        res.docs.map((i, e) => {
          alldata.push(i.data());
        });
        setUsers(alldata);
      });
  };

  const onLogin = () => {
    if (email.length > 3 && password.length > 5) {
      let check = users.find(res => res.email == email);
      if (check?.email == email.toLowerCase() && check?.password == password) {
        if (check.type == 'admin') {
          navigation.navigate('Dashboard');
          auth().signInWithEmailAndPassword(email, password);
        } else {
          navigation.navigate('Tab');
          auth().signInWithEmailAndPassword(email, password);
          dispatch(storeUser(check));
        }
      } else {
        console.log('Please Add Right details');
      }
    }
  };

  const onSignUp = () => {
    firestore()
      .collection('users')
      .add({
        name: name,
        email: email.toLowerCase(),
        password: password,
        type: 'user',
      })
      .then(() => {
        setActiveTab(0);
        auth().createUserWithEmailAndPassword(email, password);
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />

          <View style={styles.tabContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.tabBtn,
                {borderBottomWidth: activeTab == 0 ? 1 : 0},
              ]}
              onPress={() => setActiveTab(0)}>
              <Text style={styles.tabBtnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.tabBtn,
                {borderBottomWidth: activeTab == 1 ? 1 : 0},
              ]}
              onPress={() => setActiveTab(1)}>
              <Text style={styles.tabBtnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab == 0 ? (
          <View style={styles.formContainer}>
            <TextInput
              value={email}
              mode="outlined"
              placeholder="Enter your email"
              placeholderTextColor={'grey'}
              onChangeText={txt => setEmail(txt)}
              style={styles.input}
              returnKeyType="next"
            />
            <TextInput
              value={password}
              mode="outlined"
              placeholder="Enter your Password"
              placeholderTextColor={'grey'}
              onChangeText={txt => setPassword(txt)}
              style={styles.input}
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.btn} onPress={onLogin}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <TextInput
              value={name}
              mode="outlined"
              placeholder="Enter your Name"
              placeholderTextColor={'grey'}
              onChangeText={txt => setName(txt)}
              style={styles.input}
            />
            <TextInput
              value={email}
              mode="outlined"
              placeholder="Enter your email"
              placeholderTextColor={'grey'}
              onChangeText={txt => setEmail(txt.toLowerCase())}
              style={styles.input}
            />
            <TextInput
              value={password}
              mode="outlined"
              placeholder="Enter your Password"
              placeholderTextColor={'grey'}
              onChangeText={txt => setPassword(txt)}
              style={styles.input}
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.btn} onPress={onSignUp}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
  },
  logo: {
    height: 350,
    width: 350,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  tabBtn: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    borderBottomColor: '#8754eb',
  },
  tabBtnText: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Colors.black,
  },
  formContainer: {
    alignItems: 'center',
  },
  input: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 8,
  },
  btn: {
    width: '80%',
    height: 40,
    backgroundColor: '#8754eb',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 18,
  },
  btnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});
