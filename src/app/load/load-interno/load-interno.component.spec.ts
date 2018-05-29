import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadInternoComponent } from './load-interno.component';

describe('LoadInternoComponent', () => {
  let component: LoadInternoComponent;
  let fixture: ComponentFixture<LoadInternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadInternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
