import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialSkillModalComponent } from './special-skill-modal.component';

describe('SpecialSkillModalComponent', () => {
  let component: SpecialSkillModalComponent;
  let fixture: ComponentFixture<SpecialSkillModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialSkillModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialSkillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
