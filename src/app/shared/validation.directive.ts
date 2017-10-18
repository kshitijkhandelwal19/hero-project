import {Directive, ElementRef, Input, Renderer, HostListener,EventEmitter,Output,OnDestroy} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
declare var jquery:any;
declare var $ :any; 

@Directive({
    selector:'[validation]'
})
export class ValidationDirective {
    constructor(private el:ElementRef,private renderer:Renderer){}

    @Input() inputValue:string;
    @HostListener("keyup") OnKeyUp(){
        var value = this.el.nativeElement.value;
        var message = this.el.nativeElement.getAttribute("validate-message"); 
        $(this.el.nativeElement.parentElement).find(".validation-error-block").remove(); // clearing old validation
        if(this.el.nativeElement.getAttribute("validation")){
            if(this.el.nativeElement.getAttribute("validation").toLowerCase().match(/^numeric\[?[0-9]?,?[0-9]?\]?/)){
                if(!this.validateNumericOnly()){
                    console.log("InValid");
                    this.el.nativeElement.value =  value;
                }
                else{
                    console.log("Valid");
                    this.el.nativeElement.value =  value;
                }
            }
            else if(this.el.nativeElement.getAttribute("validation").toLowerCase().match(/^alphanumeric\[?[0-9]?,?[0-9]?\]?/)){
                //  var alphaNumericRegex = /^[A-Za-z]+[A-Za-z0-9\s]*$/;
                if(!this.validateAlphaNumeric()){
                    // message = message ? message : '* Only AlphaNumeric characters are allowed';
                    // $(this.el.nativeElement.parentElement).append('<small class="form-text validation-error-block text-danger">'+ message  + '</small>');
                    console.log("InValid");
                    this.el.nativeElement.value =  value;
                }
                else{
                    console.log("Valid");
                    this.el.nativeElement.value =  value;
                }
            }
        }
        
    }

    //PRIVATE METHOD SECTION STARTS
    private validateAlphaNumeric(){
        if(!this.isRequiredAndHasValue()){ //Cheque is it is empty nad required
            return false;
        }
        var alphaNumericRegex = /^[A-Za-z]+[A-Za-z0-9\s]*$/;
        var value = this.el.nativeElement.value;
        var message = this.el.nativeElement.getAttribute("validate-message"); 
        if(!value.match(alphaNumericRegex)){
            message = message ? message : '* Only AlphaNumeric characters are allowed';
            this.setErrorMessage(message);
            return false;
        }
        var validationAttribute = this.el.nativeElement.getAttribute("validation");
        var maxMinLength =  validationAttribute.split("[");
        if(maxMinLength.length > 1) {
            var minMaxRegex = maxMinLength[1].replace("[","{").replace("]","}");
            var maxMinAlphanumericRegex = new RegExp("^[A-Za-z0-9\\s]{"+minMaxRegex+"$");
            if(!value.match(maxMinAlphanumericRegex) || !value.charAt(0).match(/^[A-Za-z]$/)){
                var minMaxLength = minMaxRegex.replace("{","").replace("}","").split(",");
                var min = minMaxLength[0] ? parseInt(minMaxLength[0]) : 0;
                var max = minMaxLength.length > 1 && minMaxLength[1] ?  parseInt(minMaxLength[1]) : 0;
                if(max > 0){
                    message = message ? message : "Alphanumeric "+ min +" to "+ max +" letters allowed";
                }
                else{
                    message = message ? message : "Alphanumeric " + min + " letter(s) allowed";
                }
                this.setErrorMessage(message);
                return false;
            }
        }

        return true;
    }

    private validateNumericOnly(){
        if(!this.isRequiredAndHasValue()){ //Cheque is it is empty nad required
            return false;
        }

        var value = this.el.nativeElement.value;
        var message = this.el.nativeElement.getAttribute("validate-message"); 
        if(isNaN( value * 1)){
            message = message ? message : '* Only Numeric value is allowed';
            this.setErrorMessage(message);
            return false;
        }
        var validationAttribute = this.el.nativeElement.getAttribute("validation");
        var maxMinLength =  validationAttribute.split("[");
        if(maxMinLength.length > 1) {
            var minMaxRegex = maxMinLength[1].replace("[","{").replace("]","}");
            var maxMinNumericRegex = new RegExp("^[\\d\\.]{"+minMaxRegex+"$");
            if(!value.match(maxMinNumericRegex)){
                var minMaxLength = minMaxRegex.replace("{","").replace("}","").split(",");
                var min = minMaxLength[0] ? parseInt(minMaxLength[0]) : 0;
                var max = minMaxLength.length > 1 && minMaxLength[1] ?  parseInt(minMaxLength[1]) : 0;
                if(max > 0){
                    message = message ? message : "Numeric "+ min +" to "+ max +" digits allowed";
                }
                else{
                    message = message ? message : "Numeric " + min + " digit(s) allowed";
                }
                this.setErrorMessage(message);
                return false;
            }
        }
        return true;
    }

    private isRequiredAndHasValue(){
        //VALIDATE REQUIRED FIELD
        $(this.el.nativeElement).parent().parent().find(".validation-error-block").remove();
        $(this.el.nativeElement).parent().find(".validation-error-block").remove();  
        if(!$(this.el.nativeElement).val()){
            if($(this.el.nativeElement).parent().hasClass("input-group")){
                $(this.el.nativeElement).parent().parent().append('<small class="form-text validation-error-block text-danger">* This field is required</small>');
            }
            else
            {
                $(this.el.nativeElement).parent().append('<small class="form-text validation-error-block text-danger">* This field is required</small>');
            }
            return false;
        }
        return true;
    }

    private setErrorMessage(message){
        $(this.el.nativeElement.parentElement).append('<small class="form-text validation-error-block text-danger">'+ message  + '</small>');
    }
    //PRIVATE METHOD SECTION ENDS
}


@Directive({
    selector:'[validate]'
})
export class ValidateDirective{
    constructor(private el:ElementRef,private renderer:Renderer){}

    @Input() debounceTime = 100;
    @Output() validateClick = new EventEmitter();
    private clicks = new Subject();
    private subscription: Subscription;
    ngOnInit() {
      this.subscription = this.clicks.subscribe(e => this.validateClick.emit(e));
    }
  
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  
    @HostListener("click",['$event']) clickEvent(e){
        e.preventDefault();
        e.stopPropagation();  
        $(this.el.nativeElement).closest("form").find('.validation-form-error-block').remove();

        
        
        if(!$(this.el.nativeElement).closest("form").find(".validation-error-block").html()){
            this.clicks.next(e);
        }
        else{
            $(this.el.nativeElement).closest("form").append("<p class='text-danger validation-form-error-block text-center'><small>*Please remove the form errors and try again!!</small></p>");
        }
    }
}