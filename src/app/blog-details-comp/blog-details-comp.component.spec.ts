import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDetailsCompComponent } from './blog-details-comp.component';

describe('BlogDetailsCompComponent', () => {
  let component: BlogDetailsCompComponent;
  let fixture: ComponentFixture<BlogDetailsCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogDetailsCompComponent]
    });
    fixture = TestBed.createComponent(BlogDetailsCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
