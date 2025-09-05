import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnComponent } from './return';

describe('Return', () => {
  let component: ReturnComponent;
  let fixture: ComponentFixture<ReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
