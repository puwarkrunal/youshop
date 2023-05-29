import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/Login/LoginScreen';
import Dashboard from '../screens/Admin/Dashboard/Dashboard';
import AddProduct from '../screens/Admin/AddProduct/AddProduct';
import TabNav from './TabNav';
import {Colors} from '../constant/Colors';
import DetailScreen from '../screens/Users/DetailScreen/DetailScreen';
import CartScreen from '../screens/Users/TabScreen/Cart/CartScreen';
import ConfirmOrder from '../screens/Users/ConfirmOrder/ConfirmOrder';
import ChoosePayment from '../screens/Users/ChoosePayment/ChoosePayment';
import MyOrderList from '../screens/Users/MyOrderList/MyOrderList';
import PersonalDetails from '../screens/Users/PersonalDetails/PersonalDetails';
import AddCard from '../screens/Users/AddCard/AddCard';
import SearchScreen from '../screens/Users/Search/SearchScreen';
import ViewOrders from '../screens/Admin/ViewOrders/ViewOrders';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors.white,
        },
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Tab" component={TabNav} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} />
      <Stack.Screen name="ChoosePayment" component={ChoosePayment} />
      <Stack.Screen name="MyOrder" component={MyOrderList} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="ViewOrders" component={ViewOrders} />
    </Stack.Navigator>
  );
};

export default StackNav;
