import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePresentacionComponent } from './share-presentacion.component';

describe('SharePresentacionComponent', () => {
  let component: SharePresentacionComponent;
  let fixture: ComponentFixture<SharePresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharePresentacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharePresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
