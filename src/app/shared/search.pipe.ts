import {Pipe, PipeTransform} from '@angular/core';
import {Hero} from '../hero-component/hero';

@Pipe({
    name:'search'
})

export class SearchPipe implements PipeTransform {
    transform(list:Hero[],term:string):Hero[]{
        if(term){
            return list.filter(h=> h.Name.toLowerCase().indexOf(term.toLowerCase()) != -1);
        }
        else{
            return list;
        }
    }
}