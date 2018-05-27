import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFarmaciaComponent } from './formulario-farmacia.component';

describe('FormularioFarmaciaComponent', () => {
  let component: FormularioFarmaciaComponent;
  let fixture: ComponentFixture<FormularioFarmaciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioFarmaciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
