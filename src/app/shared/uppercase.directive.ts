import { Directive, ElementRef, Input, Renderer,HostListener} from '@angular/core';

@Directive({
  selector: '[uppercase]'
})
export class UppercaseDirective {

  constructor(private el:ElementRef, private renderer:Renderer) {
    renderer.setElementStyle(el.nativeElement,"textTransform","uppercase");
   }

   @HostListener("mouseenter") onMouseEnter(){
     this.hover(true);
   }
   @HostListener("mouseleave") onMouseLeave(){
    this.hover(false);
  }

   hover(shouldUnderline:boolean){
     if(shouldUnderline){
      this.renderer.setElementStyle(this.el.nativeElement,"textDecoration","underline");
     }
     else{
       this.renderer.setElementStyle(this.el.nativeElement,"textDecoration","none");
     }
   }

}
