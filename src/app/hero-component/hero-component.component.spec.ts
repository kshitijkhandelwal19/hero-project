import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponentComponent } from './hero-component.component';
import { FormsModule }   from '@angular/forms';
describe('HeroComponentComponent', () => {
  let component: HeroComponentComponent;
  let fixture: ComponentFixture<HeroComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
