import { TestBed, inject } from '@angular/core/testing';

import { NavParams } from './nav-params.service';

describe('NavParamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavParams]
    });
  });

  it('should be created', inject([NavParams], (service: NavParams) => {
    expect(service).toBeTruthy();
  }));
});
