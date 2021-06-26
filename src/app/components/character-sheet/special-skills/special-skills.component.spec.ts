import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialSkillsComponent } from './special-skills.component';

describe('SpecialSkillsComponent', () => {
  let component: SpecialSkillsComponent;
  let fixture: ComponentFixture<SpecialSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
