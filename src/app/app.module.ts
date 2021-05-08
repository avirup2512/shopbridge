import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared_/material.module';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers/reducers';
import { NgSelectModule } from '@ng-select/ng-select';

import { ParentComponent } from './parent/parent.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ConfirmationDialougeComponent } from './components/common/confirmation-dialouge/confirmation-dialouge.component';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
  declarations: [
    AppComponent,   
    HeaderComponent,
    FooterComponent,    
    ParentComponent,
    ProductListComponent,
    ProductCreateComponent,
    FilterComponent,
    ProductGridComponent,
    ConfirmationDialougeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    NgSelectModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
