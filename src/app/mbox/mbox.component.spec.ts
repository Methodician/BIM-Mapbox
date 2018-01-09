import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MboxComponent } from './mbox.component';

describe('MboxComponent', () => {
  let component: MboxComponent;
  let fixture: ComponentFixture<MboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
