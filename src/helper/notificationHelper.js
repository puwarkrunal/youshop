import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    fcmToken();
  }
}

const fcmToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log(token);
};
