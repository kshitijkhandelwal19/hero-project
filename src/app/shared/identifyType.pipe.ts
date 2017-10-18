import { Pipe, PipeTransform } from  '@angular/core';

@Pipe({
    name: 'IdentifyType',
    pure:false
})

export class IdentifyTypePipe implements PipeTransform{

    transform(value:string):string{
        var numberRegex = /^\d+$/;
        var alphabetRegex = /^[A-Za-z]+$/;
        var alphanumericRegex = /^[\dA-Za-z]+$/;
        var freeText = /^.+$/;
        var stringValue = "Strange"; 
        if(value){
            if(value.match(numberRegex)){
                stringValue = "Number";
            }
            else if(value.match(alphabetRegex)){
                stringValue = "Alphabet";
            }
            else if(value.match(alphanumericRegex)){
                stringValue = "AlphaNumberic";
            }
            else if(value.match(freeText)){
                stringValue = "Free Text";
            }
        }
        return value + " - " + stringValue;
    }
}