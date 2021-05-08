import { Component, OnInit,OnDestroy } from '@angular/core';
import {FormGroup,FormControl,FormArray,Validators,ValidatorFn} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router,ActivatedRoute} from '@angular/router';
import {product} from '../../store/model/model'
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducers/reducers'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addProduct, editProduct, getProductDetails, inCreatePage } from 'src/app/store/actions/productAction';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit,OnDestroy  {
  createForm:FormGroup;
  private ngUnsubscribe = new Subject();

  inProductEditPage:boolean = false;
  selectedProduct:any = {};
  productId:any;

  productImageSrc:string = '';
  productImageName:string = ''
  formDataAdded:boolean = false
  percentageOff:any = ''

  constructor(private _snackbar: MatSnackBar,private router:Router,private store:Store<AppState>, private activateRoute:ActivatedRoute ) {
    this.createForm = new FormGroup({
      name:new FormControl('',Validators.required),
      description:new FormControl(''),
      price:new FormControl('',Validators.required),
      image:new FormControl(''),
      stock:new FormControl(''),
      hasOffer:new FormControl(''),
      actualPrice:new FormControl(''),
      offeredPrice:new FormControl(''),
    });
    this.createForm.get('offeredPrice')?.valueChanges
    .subscribe((data:any)=>{
      let priceControl = this.createForm.get('price');
      let actualPrice = priceControl?.value;
      if(actualPrice !== null && actualPrice !== undefined && data !== undefined && data !== '' ){
        if(data > actualPrice){
          this.createForm.patchValue({offeredPrice:''});
          this.percentageOff = '';
        } else {
           this.percentageOff = Math.ceil((actualPrice - data)/actualPrice*100);
        }
      }
    })
   }

  ngOnInit(): void {
   this.store.dispatch(new inCreatePage({inCreatePage:true}))
   this.activateRoute.params
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params: any) => {
        if (params.hasOwnProperty('productId')) {
          this.inProductEditPage = true;
          this.productId = params.productId;   
          this.store.dispatch(new getProductDetails({id:params.productId}));
        }
      });
      this.store
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((state: any) => {
              this.selectedProduct = state.product.selectedProduct;
              if(this.selectedProduct.length > 0 && !this.formDataAdded && this.inProductEditPage){
                this.createForm.patchValue({
                  name:this.selectedProduct[0].name,
                  description:this.selectedProduct[0].description,
                  price:this.selectedProduct[0].price,                  
                  stock:this.selectedProduct[0].inStock,
                  hasOffer:this.selectedProduct[0].hasOffer,
                  offeredPrice:this.selectedProduct[0].offeredPrice,
                });
                this.productImageSrc = this.selectedProduct[0].image !== undefined ?this.selectedProduct[0].image:'';
                this.productImageName = this.selectedProduct[0].imageName !== undefined ?this.selectedProduct[0].imageName:'';
                this.percentageOff = this.selectedProduct[0].percentageOff;
                this.formDataAdded = true;
              }    
        })
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.store.dispatch(new inCreatePage({inCreatePage:false}))
  }
  getErrorMessage(control:any):string {
    let message:string='';
    if(this.createForm !== undefined) {
      let controls = this.createForm.get(control) as FormControl;
      if(controls.hasError('required')){
        message += control+' is required.';
      }
    };
    return message
  };
  uploadImage(event:any){
    event.preventDefault()
    let image = document.getElementById('image');
    if(image !== undefined) {
      image?.click();
    }
  };
  removeImage(event:any){
    event.preventDefault();
    this.productImageName = '';
    this.productImageSrc = '';
     let image = document.getElementById('image') as HTMLInputElement;
     if(image !== null){
       image.value = '';
     }     
  }
  changeImage(event:any){
            if (event.target.files && event.target.files[0]) {
            if ((event.target.files[0].type === 'image/jpeg' ||
                event.target.files[0].type === 'image/png' ||
                event.target.files[0].type === 'image/jpg' ||
                event.target.files[0].type === 'image/gif') && event.target.files[0].size < 10000000) {

                if (event.target.files && event.target.files.length) {                    
                    var reader = new FileReader();
                    reader.onload = (readerEvent: any) => {                      
                      this.productImageName = event.target.files[0].name;
                        this.productImageSrc = readerEvent.target.result;
                    }
                    reader.readAsDataURL(event.target.files[0]);
                }
            } else if ((event.target.files[0].type === 'image/jpeg' ||
                event.target.files[0].type === 'image/png' ||
                event.target.files[0].type === 'image/jpg' ||
                event.target.files[0].type === 'image/gif') && event.target.files[0].size > 10000000) {
                this._snackbar.open('Uploaded file is greater than 2 MB', 'close', {
                    duration: 2000
                });
            } else if (event.target.files[0].type !== 'image/jpeg' ||
                event.target.files[0].type !== 'image/png' ||
                event.target.files[0].type !== 'image/jpg' ||
                event.target.files[0].type !== 'image/gif') {
                this._snackbar.open('UnSuported an image format', 'close', {
                    duration: 2000
                });
            }
        }
  }
  hasOffer():boolean{
    let hasOffer:boolean = false;
    let hasOfferControl = this.createForm.get('hasOffer');
    if(hasOfferControl !== null){      
      hasOffer = hasOfferControl.value;
    }
    return hasOffer;
  };
  getPrice():string{
    let price:string = '';
    let actualPriceControl = this.createForm.get('price');
    if(actualPriceControl !== null){
      price = actualPriceControl.value;
    }
    return price;
  };
  submitForm(){
    let product:product = {id:'', name:'',description:'', price:0 };
    if(this.createForm.valid){
      product.name = this.createForm.value.name;
      product.description = this.createForm.value.description;
      product.price = this.createForm.value.price;
      product.inStock = this.createForm.value.stock !== undefined ?this.createForm.value.stock :'';
      product.offeredPrice = this.createForm.value.offeredPrice !== undefined ?this.createForm.value.offeredPrice :'';
      product.image = this.productImageSrc !== undefined ?this.productImageSrc :'';
      product.hasOffer = this.createForm.value.hasOffer !== undefined ?this.createForm.value.hasOffer :false;
      product.imageName = this.productImageName;
      product.percentageOff = this.percentageOff;
      if(this.inProductEditPage){
        product.id = this.productId
        this.store.dispatch(new editProduct({id:this.productId, data:product}))
      }else{
        this.store.dispatch(new addProduct(product));
      }
      this.router.navigate(['/products/product-list']);
    }
  }
  cancelCreation(){
    this.router.navigate(['/products/product-list']);
  }
  validateHasOfferCheckbox() {
    let bool:boolean = true;
    let priceControl = this.createForm.get('price');
    let offeredPriceControl = this.createForm.get('offeredPrice');
    if(priceControl !== null){ 
      if(priceControl.value !== '' && priceControl.value !== null && priceControl.value >= 0) {
        bool = false;
      }     
    };
    if(offeredPriceControl !== null && bool){
      offeredPriceControl.disable();
    }else if(offeredPriceControl !== null && !bool){
      offeredPriceControl.enable();
    }
    return bool;
  };
  changeHasOffer(event:any){
    if(!event.checked) {
      this.createForm.patchValue({offeredPrice:''});
      this.percentageOff = '';
      this.createForm.controls['offeredPrice'].clearValidators();
    }else{
      this.createForm.controls['offeredPrice'].setValidators([Validators.required]);               
    }
    this.createForm.controls['offeredPrice'].updateValueAndValidity();
  }
}
