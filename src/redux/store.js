import {persistStore, persistReducer} from 'redux-persist';
import {createStore, combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartReducer from './reducers/cartReducer';
import userReducer from './reducers/userReducer';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const rootReducer = combineReducers({
  user: persistedUserReducer,
  cart: persistedCartReducer,
});

// Create the persisted root reducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Create the Redux store
export const store = createStore(persistedReducer);

// Create the persisted Redux store
export const persistor = persistStore(store);
