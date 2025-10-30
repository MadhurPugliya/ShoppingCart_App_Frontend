import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercahntComponent } from './mercahnt.component';

describe('MercahntComponent', () => {
  let component: MercahntComponent;
  let fixture: ComponentFixture<MercahntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercahntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MercahntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
