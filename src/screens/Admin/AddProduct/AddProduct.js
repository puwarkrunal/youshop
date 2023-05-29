import {
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {backIcon} from '../../../asset/images';
import {Colors} from '../../../constant/Colors';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/core';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddProduct = () => {
  const navigation = useNavigation();

  const [qty, setQty] = useState();
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [sizeArr, setSizeArr] = useState([]);
  const [category, setCategory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState('');
  const [isCatDropOpen, setIsCatDropOpen] = useState(false);

  const chooseImages = () => {
    launchImageLibrary({mediaType: 'photo', multiple: true}, response => {
      if (response?.assets) {
        const newImages = response.assets.map(asset => asset.uri);
        setImages(prevImages => [...prevImages, ...newImages]);
      }
    });
  };

  const uploadImages = async () => {
    setUploading(true);
    try {
      const promises = images.map(async imageUri => {
        const imageRef = storage().ref(`images/${Date.now()}`);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        await imageRef.put(blob);
        const downloadURL = await imageRef.getDownloadURL();
        return downloadURL;
      });
      const downloadURLs = await Promise.all(promises);
      return downloadURLs;
    } catch (error) {
      console.log(error);
      // Handle the error
      throw new Error('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const addProduct = async () => {
    try {
      const downloadURLs = await uploadImages();
      const product = {
        name,
        description,
        category,
        price,
        qty,
        images: downloadURLs,
      };
      sizeArr.length > 0 ? (product.sizes = sizeArr) : null;
      await firestore().collection('products').add(product);
      navigation.navigate('Dashboard');
    } catch (error) {
      console.log(error);
      throw new Error('Failed to add product');
    }
  };

  const catdata = ['Clothes', 'Bags', 'Shoes', 'Electronics', 'Jewelry'];

  const onSizeAdd = () => {
    setSize('');
    setSizeArr([...sizeArr, size]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {uploading ? (
        <ActivityIndicator size={'large'} animating={uploading} />
      ) : (
        <ScrollView contentContainerStyle={{paddingBottom: 24}}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backImage}>
              <Image source={backIcon} />
            </TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Add Item</Text>
            <Text></Text>
          </View>

          {/* TextInput */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              onChangeText={txt => setName(txt)}
            />

            <Text style={styles.inputHeader}>Description</Text>
            <TextInput
              placeholder="Enter your Description"
              style={styles.input}
              onChangeText={txt => setDescription(txt)}
              multiline
            />

            <Text style={styles.inputHeader}>Price</Text>
            <TextInput
              placeholder="Enter your Price"
              style={styles.input}
              onChangeText={txt => setPrice(txt)}
              keyboardType="number-pad"
            />

            <Text style={styles.inputHeader}>Quntity</Text>
            <TextInput
              placeholder="Enter your Quantity"
              style={styles.input}
              onChangeText={txt => setQty(txt)}
              keyboardType="number-pad"
            />

            <Text style={styles.inputHeader}>Categories</Text>
            <Pressable
              style={styles.input}
              onPress={() => setIsCatDropOpen(!isCatDropOpen)}>
              <Text style={{color: category ? Colors.black : 'lightgrey'}}>
                {category == null ? 'Please select category' : category}
              </Text>
            </Pressable>

            <View style={{display: isCatDropOpen ? 'flex' : 'none'}}>
              {catdata.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.catItem}
                    onPress={() => {
                      setCategory(item);
                      setIsCatDropOpen(!isCatDropOpen);
                    }}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {category == 'Shoes' && (
              <>
                <Text style={styles.inputHeader}>Enter Sizes</Text>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    value={size}
                    maxLength={3}
                    placeholder="Enter Size"
                    style={[styles.input, {width: '90%'}]}
                    onChangeText={txt => setSize(txt)}
                  />
                  <TouchableOpacity onPress={onSizeAdd} style={styles.plusIcon}>
                    <AntDesign name="plus" size={18} color={Colors.white} />
                  </TouchableOpacity>
                </View>
                {sizeArr.length > 0 && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text>Sizes: </Text>
                    {sizeArr?.map((i, e) => (
                      <TouchableOpacity key={e} style={styles.sizeBtn}>
                        <Text>{i}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </>
            )}

            <ScrollView
              horizontal
              contentContainerStyle={{flexDirection: 'row'}}>
              {images.map(uri => (
                <Image
                  key={uri}
                  source={{uri}}
                  style={{width: 150, height: 150, resizeMode: 'contain'}}
                />
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={chooseImages}
              style={[styles.Mainbtn, {backgroundColor: 'blue'}]}>
              <Text style={{color: 'white'}}>Choose Images</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={addProduct}
              disabled={uploading}
              style={[styles.Mainbtn, {borderColor: 'blue'}]}>
              <Text>Add Product</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    borderBottomWidth: 1,
    padding: 9,
    marginVertical: 6,
  },
  inputHeader: {
    fontSize: 14,
    marginTop: 12,
  },
  btn: {
    height: 50,
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  Mainbtn: {
    height: 40,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  categoryBox: {},
  catItem: {
    padding: 6,
    backgroundColor: '#f1f1f1',
    margin: 1,
  },
  plusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {
    backgroundColor: Colors.black,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeBtn: {
    height: 20,
    width: 20,
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 6,
  },
});
