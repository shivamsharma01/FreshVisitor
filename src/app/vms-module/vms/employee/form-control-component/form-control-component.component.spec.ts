import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlComponentComponent } from './form-control-component.component';

describe('FormControlComponentComponent', () => {
  let component: FormControlComponentComponent;
  let fixture: ComponentFixture<FormControlComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormControlComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
