import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors} from '../../../constant/Colors';
import {backIcon, cartIcon} from '../../../asset/images';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../../../redux/reducers/cartReducer';

const DetailScreen = () => {
  const route = useRoute();
  const {item} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [count, setCount] = useState(1);
  const cartData = useSelector(state => state.cart.items);

  const isAlreadyAdded = cartData.some(i => i.id == item.id);

  const onMin = () => {
    count > 0 ? setCount(count - 1) : count;
  };
  const onPlus = () => {
    if (count < item.quantity) {
      setCount(count + 1);
    }
  };

  const onAddCart = () => {
    if (count == 0) {
      Alert.alert('Add Qty');
    } else {
      const data = {
        id: item.id,
        name: item.name,
        quantity: count,
        price: item.price,
        description: item.description,
        image: item.images,
        category: item.category,
      };
      dispatch(addItem(data));
      setTimeout(() => navigation.navigate('Cart'), 500);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top View */}
      <View style={{height: '50%'}}>
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
        {console.log(item.images[0], 'item.images[0]')}
        <Image
          source={{uri: item.images[0]}}
          style={{height: '100%', width: '100%'}}
        />
      </View>

      {/* Bottom View */}
      <View style={styles.detailContainer}>
        <View style={styles.cardHeader}>
          {/* Left View */}
          <View>
            <Text style={styles.headingText}>{item.name}</Text>
            <Text style={{color: Colors.black}}>{item.category}</Text>
            <Text style={{color: Colors.black}}>No Ratings</Text>
          </View>
          {/* Right View */}
          <View
            style={{
              display: isAlreadyAdded ? 'none' : 'flex',
              alignItems: 'flex-end',
            }}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={onMin}>
                <Text style={{color: Colors.black}}>-</Text>
              </TouchableOpacity>
              <Text style={{color: Colors.black}}>{count}</Text>
              <TouchableOpacity onPress={onPlus}>
                <Text style={{color: Colors.black}}>+</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                marginTop: 10,
                fontSize: 11,
                fontWeight: '600',
                color: Colors.black,
              }}>
              {item.quantity == 0 ? 'Out of stok' : 'Avaliable in stok'}
            </Text>
          </View>
        </View>

        {/* Size */}
        {item?.size && (
          <View>
            <Text style={{color: Colors.black}}>Size</Text>
            {item?.size.map(({i, e}) => {
              <TouchableOpacity key={e}>
                <Text>{i}</Text>
              </TouchableOpacity>;
            })}
          </View>
        )}

        {/* Description */}
        <View style={{marginTop: 25, marginHorizontal: 25}}>
          <Text style={styles.headingText}>Description</Text>
          <Text style={{color: Colors.black}}>{item?.description}</Text>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 100,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          alignItems: 'center',
        }}>
        <View>
          <Text style={{fontSize: 9, fontWeight: '400', color: '#AAAAAA'}}>
            Total Price
          </Text>
          <Text style={{fontSize: 18, fontWeight: '700', color: Colors.black}}>
            ₹{item?.price}
          </Text>
        </View>
        <TouchableOpacity
          onPress={
            isAlreadyAdded ? () => navigation.navigate('Cart') : onAddCart
          }
          style={{
            width: 200,
            height: 50,
            backgroundColor: Colors.black,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Image />
          <Text style={{fontSize: 16, fontWeight: '600', color: Colors.white}}>
            {isAlreadyAdded ? 'Go to cart' : 'Add to cart'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 10,
    zIndex: 9,
    width: '100%',
  },
  headerIcon: {
    height: 35,
    width: 35,
    borderRadius: 18,
    backgroundColor: Colors.black,
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
  detailContainer: {
    height: '60%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    top: -20,
  },
  qtyContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    width: 80,
    height: 30,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cardHeader: {
    marginHorizontal: 25,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
