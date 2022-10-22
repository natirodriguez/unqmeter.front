import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponderPresentacionComponent } from './responder-presentacion.component';

describe('ResponderPresentacionComponent', () => {
  let component: ResponderPresentacionComponent;
  let fixture: ComponentFixture<ResponderPresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponderPresentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponderPresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
