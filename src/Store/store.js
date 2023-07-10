import productReducer from '../Reducer/productReducer'
import { createStore } from 'redux';


const store = createStore(productReducer);

export default store;
