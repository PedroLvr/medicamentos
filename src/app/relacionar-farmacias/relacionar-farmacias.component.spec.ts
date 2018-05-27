import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionarFarmaciasComponent } from './relacionar-farmacias.component';

describe('RelacionarFarmaciasComponent', () => {
  let component: RelacionarFarmaciasComponent;
  let fixture: ComponentFixture<RelacionarFarmaciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelacionarFarmaciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelacionarFarmaciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
