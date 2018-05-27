import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFarmaciasComponent } from './lista-farmacias.component';

describe('ListaFarmaciasComponent', () => {
  let component: ListaFarmaciasComponent;
  let fixture: ComponentFixture<ListaFarmaciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFarmaciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFarmaciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
