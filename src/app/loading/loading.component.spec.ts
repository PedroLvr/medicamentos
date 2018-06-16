import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadExternoComponent } from './load-externo.component';

describe('LoadExternoComponent', () => {
  let component: LoadExternoComponent;
  let fixture: ComponentFixture<LoadExternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadExternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadExternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
