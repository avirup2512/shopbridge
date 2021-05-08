import { Component, OnInit,OnDestroy } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducers/reducers'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { sortProduct } from 'src/app/store/actions/productAction';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  private ngUnsubscribe = new Subject();
  products:Array<any> = [];

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
     this.store
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((state: any) => {
              this.products = state.product.productlist;       
        })
  };
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  };
  sortingEmit(event:any){
    this.store.dispatch(new sortProduct({type:event}));  
  }

}
