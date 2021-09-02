import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatWeaponComponent } from './combat-weapon.component';

describe('CombatWeaponComponent', () => {
  let component: CombatWeaponComponent;
  let fixture: ComponentFixture<CombatWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombatWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
