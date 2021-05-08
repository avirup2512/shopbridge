import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
   foods: Array<any> = [
    {value: 'lowtohigh', viewValue: 'Low to High'},
    {value: 'hightolow', viewValue: 'High to Low'},
    {value: 'datecreated', viewValue: 'Date Created'},
  ];

  @Output() sortingEmit:EventEmitter<any> = new EventEmitter();

  constructor(private router:Router) { }

  ngOnInit(): void {
  };

  addProduct(){
    this.router.navigate(['/products/product-create'])
  };
  sortingProduct(event:any){
    this.sortingEmit.emit(event.value);
 }

}
