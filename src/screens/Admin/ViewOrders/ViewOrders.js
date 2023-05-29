import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
import {Colors} from '../../../constant/Colors';
import CHeader from '../../../components/CHeader';

const ViewOrders = () => {
  const route = useRoute();
  const {item} = route.params;

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity key={index} style={styles.productCard}>
        <Text>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text>₹{item.price}</Text>
        <Text>x{item.quantity}</Text>
      </TouchableOpacity>
    );
  };

  const onAccept = () => {};

  const timestamp = item.orderDate;
  const milliseconds =
    timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1000000);
  const date = new Date(milliseconds);

  return (
    <SafeAreaView style={styles.container}>
      <CHeader />
      <View style={{marginTop: 12}}>
        <Text style={{color: Colors.black}}>
          Order Date: {moment(date).format('LL')}
        </Text>
        <Text style={{color: Colors.black}}>{item.totalPrice}</Text>
        <FlatList
          data={item.products}
          renderItem={renderCard}
          keyExtractor={(_, index) => index}
        />

        <TouchableOpacity onPress={onAccept} style={styles.acceptBtn}>
          <Text>Accept Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ViewOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  acceptBtn: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard: {
    width: '90%',
    alignSelf: 'center',
    height: 'auto',
    minHeight: 120,
    backgroundColor: 'green',
    marginVertical: 12,
  },
});
