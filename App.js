import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from './src/navigation/StackNav';
import {Provider as PaperProvider} from 'react-native-paper';
import {requestUserPermission} from './src/helper/notificationHelper';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';

const App = () => {
  useEffect(() => {
    // requestUserPermission();
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider>
            <StackNav />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
