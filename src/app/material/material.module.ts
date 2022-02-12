import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { MatButtonModule }  from '@angular/material/button'
import {MatInputModule} from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { MatSliderModule } from '@angular/material/slider';
import {  MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

const material = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule ,
  MatCardModule,
  MatButtonToggleModule,
  MatSliderModule,
  MatToolbarModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    material
  ],
  exports: [
    material
  ]
})
export class MaterialModule { }
