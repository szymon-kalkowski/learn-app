import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinUsBoxComponent } from './join-us-box.component';

describe('JoinUsBoxComponent', () => {
  let component: JoinUsBoxComponent;
  let fixture: ComponentFixture<JoinUsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinUsBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinUsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
