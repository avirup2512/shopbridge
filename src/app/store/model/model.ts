export interface product {
    id:any,
    name: string,
    description: string,
    price: number,
    inStock?: string,
    hasOffer?:boolean,
    offeredPrice?:number,
    image?:string,
    imageName?:string,
    percentageOff?:string
}

export interface productList {
    productlist:Array<product>,
    immutableProductList:Array<product>,
    selectedProduct:Object,
    inCreatePage?:boolean
}