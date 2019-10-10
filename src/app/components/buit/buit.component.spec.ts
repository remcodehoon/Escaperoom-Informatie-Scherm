import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuitComponent } from './buit.component';

describe('BuitComponent', () => {
  let component: BuitComponent;
  let fixture: ComponentFixture<BuitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
