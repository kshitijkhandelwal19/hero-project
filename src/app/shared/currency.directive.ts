import {Directive, ElementRef, Input, Renderer, HostListener} from '@angular/core';

@Directive({
    selector:'[currency]'
})

export class CurrencyDirective{
    constructor(private el:ElementRef,private renderer:Renderer){}
    @Input() inputValue:string;
    @HostListener("change") OnChange(){
        if(this.el.nativeElement.value){
            var formatter = new Intl.NumberFormat("ru", {
                style: "currency",
                currency: "INR"
              });
            this.inputValue = formatter.format(this.el.nativeElement.value);            
        }

        this.el.nativeElement.value =  this.inputValue;
    }
}
