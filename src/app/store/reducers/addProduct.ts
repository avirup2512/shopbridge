import { product,productList } from '../model/model';
import { productAction,productActionTypes } from '../actions/productAction';

const initialState: productList = {
    productlist:[],
    immutableProductList:[],
    selectedProduct:{}
};
function idGenerator(min: any, max: any) {
    let id = Math.random() * (max - min) + min + new Date();
    return id;
}

export function addProduct(state: productList | undefined = initialState, action: productAction): productList {
    let product:any = {};
    let productlist:Array<any> = [];
    let immutableProductList:Array<any> = [];
    state.productlist.forEach((e:any)=>{
                productlist.push(e);
                immutableProductList.push(e);
            });
    switch (action.type) {
        case productActionTypes.ADD_PRODUCT:
            product = Object.assign({},action.payload,{id:idGenerator(1,5)});
            productlist.push(product);
            immutableProductList.push(product);
            return { ...state, productlist,immutableProductList }
        case productActionTypes.GET_PRODUCT_DETAILS:
            let selectedProduct = state.productlist.filter((e:any)=>{
                return e.id == action.payload.id
            });           
            return {...state,selectedProduct};
        case productActionTypes.EDIT_PRODUCT:
           productlist =  productlist.map((e:any)=> {
                if(action.payload.hasOwnProperty('id') && action.payload.id !== undefined &&    action.payload.id == e.id) {
                    e = action.payload.data;
                };
                return e
            });
            immutableProductList = productlist;
            return {...state,productlist,immutableProductList};
        case productActionTypes.DELETE_PRODUCT:
            productlist = productlist.filter((e:any)=>{
                return e.id !== action.payload.id
            });
            immutableProductList = productlist;            
            return {...state,productlist,immutableProductList}
        case productActionTypes.CLONE_PROPERTY:
            let clonedProduct:any = {}
            productlist.forEach((e:any)=>{
                if(e.id == action.payload.id){
                    clonedProduct = Object.assign({},e,{id:''});
                }
            });
            clonedProduct.id = '';
            product = Object.assign({},clonedProduct,{id:idGenerator(1,5)})
            productlist.push(product);
            immutableProductList.push(product);
            return { ...state, productlist };
            case productActionTypes.SEARCH_PRODUCT:
                if(action.payload.name.length > 0){
                    productlist = state.immutableProductList.filter((e:any)=> {                        
                        return e.name.includes(action.payload.name) ;
                    });
                }else{
                    productlist = state.immutableProductList;
                }
            return {...state, productlist};
            case productActionTypes.SORT_PRODUCT:
                if(action.payload.type == 'lowtohigh') {
                    productlist = immutableProductList.sort((a:any,b:any)=>{
                        return a.price-b.price;
                    })
                } else if (action.payload.type == 'hightolow') {
                    productlist = immutableProductList.sort((a:any,b:any)=>{
                        return b.price-a.price;
                    })
                };
            return {...state,productlist};
            case productActionTypes.PAGINATE_PRODUCT:
            productlist = immutableProductList.filter((e:any,i:any)=> {
                if(i !== 0 &&i >= action.payload.pageIndex &&  i <= action.payload.pageIndex * action.payload.pageSize){
                    return e;
                }else if(i == 0){
                    return e
                }
            });
            return {...state,productlist};
        case productActionTypes.PAGE_DETREMNATION:
            let inCreatePage:boolean = false;
            if(action.payload.hasOwnProperty('inCreatePage')){
                inCreatePage = action.payload.inCreatePage;
            }
        return {...state,inCreatePage}
        default:
            return state;
    }

}
