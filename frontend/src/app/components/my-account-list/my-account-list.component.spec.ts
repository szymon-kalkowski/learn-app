import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountListComponent } from './my-account-list.component';

describe('MyAccountListComponent', () => {
  let component: MyAccountListComponent;
  let fixture: ComponentFixture<MyAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
