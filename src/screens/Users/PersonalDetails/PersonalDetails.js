import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../constant/Colors';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import CHeader from '../../../components/CHeader';

const PersonalDetails = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const userData = useSelector(state => state.user.data);

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

  useEffect;

  const onSave = () => {
    if (street != '' && city != '' && state != '' && zipcode != '') {
      let data = {
        street,
        city,
        state,
        zipcode,
      };
      const userRef = firestore()
        .collection('users')
        .where('email', '==', userData.email);

      userRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // Update the document with new fields
          doc.ref
            .update({
              address: data,
            })
            .then(() => {
              console.log('Fields added successfully.');
            })
            .catch(error => {
              console.error('Error updating fields:', error);
            });
        });
      });
    } else {
      console.log('Please Fill all require Field');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CHeader />
      <View style={{width: '80%', alignSelf: 'center'}}>
        <Text style={styles.heading}>Personal Details</Text>
        <Text>Name</Text>
        <TextInput
          style={styles.input}
          value={currentUser.name}
          editable={false}
        />
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={currentUser.email}
          editable={false}
        />
      </View>
      {currentUser.address ? (
        <View style={{width: '80%', alignSelf: 'center'}}>
          <Text>Street</Text>
          <TextInput
            value={currentUser.address.street}
            style={styles.input}
            placeholder="Enter your street"
            editable={false}
          />
          <Text>City</Text>
          <TextInput
            value={currentUser.address.city}
            style={styles.input}
            placeholder="Enter your city"
            editable={false}
          />
          <Text>State</Text>
          <TextInput
            value={currentUser.address.state}
            style={styles.input}
            placeholder="Enter your state"
            editable={false}
          />
          <Text>Zip code</Text>
          <TextInput
            value={currentUser.address.zipcode}
            style={styles.input}
            placeholder="Enter your zipcode"
            editable={false}
          />
        </View>
      ) : (
        <View style={{width: '80%', alignSelf: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder="Enter your street"
            onChangeText={txt => setStreet(txt)}
            placeholderTextColor={'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your city"
            onChangeText={txt => setCity(txt)}
            placeholderTextColor={'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your state"
            onChangeText={txt => setState(txt)}
            placeholderTextColor={'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your zipcode"
            onChangeText={txt => setZipcode(txt)}
            placeholderTextColor={'grey'}
          />

          <TouchableOpacity style={styles.btn} onPress={onSave}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input: {
    width: '100%',
    fontSize: 16,
    color: Colors.black,
    padding: 9,
    borderBottomWidth: 1,
    marginVertical: 7,
  },
  heading: {
    marginTop: 12,
    fontWeight: '700',
    color: Colors.black,
    fontSize: 18,
    marginBottom: 24,
  },
  btn: {
    width: '100%',
    backgroundColor: 'green',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginVertical: 8,
  },
});
