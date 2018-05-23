import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRemediosComponent } from './lista-remedios.component';

describe('ListaRemediosComponent', () => {
  let component: ListaRemediosComponent;
  let fixture: ComponentFixture<ListaRemediosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRemediosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRemediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
