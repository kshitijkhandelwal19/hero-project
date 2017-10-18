import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercaseDirective } from './uppercase.directive';
import { CurrencyDirective } from './currency.directive';
import { ValidationDirective,ValidateDirective } from './validation.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[UppercaseDirective,CurrencyDirective,ValidationDirective,ValidateDirective],
  declarations: [UppercaseDirective,CurrencyDirective,ValidationDirective,ValidateDirective]
})
export class SharedModule { }
