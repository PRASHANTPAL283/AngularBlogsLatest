import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPeoplesComponent } from './all-peoples.component';

describe('AllPeoplesComponent', () => {
  let component: AllPeoplesComponent;
  let fixture: ComponentFixture<AllPeoplesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPeoplesComponent]
    });
    fixture = TestBed.createComponent(AllPeoplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
