import {Pipe,PipeTransform} from '@angular/core';
import {Hero} from '../hero-component/hero';

@Pipe({
    name:'sort'
})

export class SortPipe implements PipeTransform{
    transform(list:Hero[],field:string,direction:string):Hero[]{
        if(field){
             list.sort((a:Hero,b:Hero)=>{
                if(a[field].toLowerCase() < b[field].toLowerCase()){
                    return direction == 'asc' ? -1 : 1;
                }
                else if(a[field].toLowerCase() > b[field].toLowerCase()){
                    return direction == 'asc' ? 1 : -1;
                }
                else {
                    return 0;
                }
            })
            return list;
        }
        else{
            return list;
        }
    }
}