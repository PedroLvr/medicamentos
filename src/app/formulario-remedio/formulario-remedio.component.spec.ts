import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRemedioComponent } from './formulario-remedio.component';

describe('FormularioRemedioComponent', () => {
  let component: FormularioRemedioComponent;
  let fixture: ComponentFixture<FormularioRemedioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioRemedioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRemedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
