import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationEditionComponent } from './presentation-edition.component';

describe('PresentationEditionComponent', () => {
  let component: PresentationEditionComponent;
  let fixture: ComponentFixture<PresentationEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentationEditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PresentationEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
