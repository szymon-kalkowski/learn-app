import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountEditComponent } from './my-account-edit.component';

describe('MyAccountEditComponent', () => {
  let component: MyAccountEditComponent;
  let fixture: ComponentFixture<MyAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
