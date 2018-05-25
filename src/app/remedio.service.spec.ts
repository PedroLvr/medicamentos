import { TestBed, inject } from '@angular/core/testing';

import { RemedioService } from './remedio.service';

describe('RemedioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemedioService]
    });
  });

  it('should be created', inject([RemedioService], (service: RemedioService) => {
    expect(service).toBeTruthy();
  }));
});
