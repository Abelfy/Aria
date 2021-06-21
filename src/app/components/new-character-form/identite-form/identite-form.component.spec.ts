import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentiteFormComponent } from './identite-form.component';

describe('IdentiteFormComponent', () => {
  let component: IdentiteFormComponent;
  let fixture: ComponentFixture<IdentiteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentiteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
