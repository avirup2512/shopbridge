import { ActionReducerMap } from '@ngrx/store';
import {addProduct} from './addProduct'
import {productList} from '../model/model';
export const rootReducer = {};

export interface AppState {
    product: productList;  
};


export const reducers: ActionReducerMap<AppState, any> = {
    product:addProduct
};