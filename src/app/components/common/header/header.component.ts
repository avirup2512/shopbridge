import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/reducers/reducers'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { inCreatePage, searchProduct } from 'src/app/store/actions/productAction';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  searchForm: FormGroup;
  inCreatePage:boolean = false;
  private ngUnsubscribe = new Subject();

  constructor(private store:Store<AppState>,private router:Router) {
    this.searchForm = new FormGroup({
      searchProduct: new FormControl('')
    })
  };
  ngOnInit(): void {
      this.store
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((state: any) => {
          console.log(state.product.inCreatePage);
          if(state.product.hasOwnProperty('inCreatePage') && state.product.inCreatePage !== undefined) {
            this.inCreatePage = state.product.inCreatePage;
          }
        })
  };
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  searchByName(value:any){
    this.store.dispatch(new searchProduct({name:value})) 
  }

}
