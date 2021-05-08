import { Action } from '@ngrx/store';
export enum productActionTypes {
    ADD_PRODUCT = 'ADD_PRODUCT',
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    EDIT_PRODUCT = 'EDIT_PRODUCT',
    GET_PRODUCT_DETAILS = 'GET_PRODUCT_DETAILS',
    CLONE_PROPERTY = 'CLONE_PROPERTY',
    SEARCH_PRODUCT = 'SEARCH_PRODUCT',
    SORT_PRODUCT ='SORT_PRODUCT',
    PAGINATE_PRODUCT = 'PAGINATE_PRODUCT',
    PAGE_DETREMNATION = 'PAGE_DETREMNATION'
};

export class addProduct implements Action {
    readonly type = productActionTypes.ADD_PRODUCT
    constructor(public payload: any) {}
};
export class deleteProduct implements Action {
    readonly type = productActionTypes.DELETE_PRODUCT
    constructor(public payload: any) {}
};
export class editProduct implements Action {
    readonly type = productActionTypes.EDIT_PRODUCT
    constructor(public payload: any) {}
}
export class getProductDetails implements Action {
    readonly type = productActionTypes.GET_PRODUCT_DETAILS
    constructor(public payload: any) {}
}
export class cloneProperty implements Action {
    readonly type = productActionTypes.CLONE_PROPERTY
    constructor(public payload: any) {}
}
export class searchProduct implements Action {
    readonly type = productActionTypes.SEARCH_PRODUCT
    constructor(public payload: any) {}
}
export class sortProduct implements Action {
    readonly type = productActionTypes.SORT_PRODUCT
    constructor(public payload: any) {}
}
export class paginateProduct implements Action {
    readonly type = productActionTypes.PAGINATE_PRODUCT
    constructor(public payload: any) {}
}
export class inCreatePage implements Action {
    readonly type = productActionTypes.PAGE_DETREMNATION
    constructor(public payload: any) {}
}

export type productAction = addProduct | deleteProduct | editProduct | getProductDetails | cloneProperty | searchProduct | sortProduct | paginateProduct | inCreatePage