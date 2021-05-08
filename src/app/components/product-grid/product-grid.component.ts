import { Component, OnInit,Input } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducers/reducers'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cloneProperty, deleteProduct, editProduct, paginateProduct } from 'src/app/store/actions/productAction';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialougeComponent } from '../common/confirmation-dialouge/confirmation-dialouge.component';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  
  products_:Array<any> = [];
  @Input() set products(products:any){
    if(products !== undefined){
      this.products_ = products;
      length = this.products_.length;
    }
  }
  length:any;
  pageSize = 3;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  constructor(private store:Store<AppState>,private router:Router,private dialog: MatDialog) { 
    this.pageEvent = {pageIndex:0,pageSize:this.pageSize,length:this.length}
  }

  ngOnInit(): void {
  };

  editProduct(id:any) {
    this.router.navigate(['products/product-edit/',id])
    this.store.dispatch(new editProduct(id))
  }
  deleteProduct(id:any){
    let dialogRef =  this.dialog.open(ConfirmationDialougeComponent, { data: {textContent:'Are you want to delete it ?'} , panelClass: ['pop-up', 'md-pop',] });
    dialogRef.afterClosed()
    .subscribe((result:any)=>{      
      if(result !== undefined && result == 'delete'){
        this.store.dispatch(new deleteProduct({id}));
      }      
    })
  };
  cloneProduct(id:any){
    this.store.dispatch(new cloneProperty({id}))
  };
  currentPage:any = 0;
  paginate(event:any){
    this.currentPage = event;
  }

}
