import React from 'react';
import {Colors} from '../constant/Colors';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {horizontalScale, moderateScale} from '../helper/Metrix';
import HomeScreen from '../screens/Users/TabScreen/Home/HomeScreen';
import CartScreen from '../screens/Users/TabScreen/Cart/CartScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/Users/TabScreen/Profile/ProfileScreen';
import NotificationScreen from '../screens/Users/TabScreen/Notification/NotificationScreen';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  const ActiveTab = ({name, iconName}) => {
    return (
      <View style={styles.activeTabContainer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={iconName}
            color={Colors.white}
            size={moderateScale(18)}
          />
        </View>
        <Text style={{color: Colors.black}}>{name}</Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopRightRadius: moderateScale(30),
          borderTopLeftRadius: moderateScale(30),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          elevation: 6,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <ActiveTab name={'Home'} iconName={'home'} />
            ) : (
              <AntDesign
                name="home"
                color={Colors.black}
                size={moderateScale(18)}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <ActiveTab name={'Cart'} iconName={'shoppingcart'} />
            ) : (
              <AntDesign
                name="shoppingcart"
                color={Colors.black}
                size={moderateScale(18)}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <ActiveTab name={'Notifi'} iconName={'notification'} />
            ) : (
              <AntDesign
                name="notification"
                color={Colors.black}
                size={moderateScale(18)}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => {
            return focused ? (
              <ActiveTab name={'Profile'} iconName={'user'} />
            ) : (
              <AntDesign
                name="user"
                color={Colors.black}
                size={moderateScale(18)}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;

const styles = StyleSheet.create({
  activeTabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    width: horizontalScale(76),
    justifyContent: 'space-evenly',
    borderRadius: moderateScale(30),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(30),
    height: moderateScale(30),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(15),
  },
});
