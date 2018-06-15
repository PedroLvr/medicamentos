import { TestBed, inject } from '@angular/core/testing';

import { SessaoService } from './sessao.service';

describe('SessaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessaoService]
    });
  });

  it('should be created', inject([SessaoService], (service: SessaoService) => {
    expect(service).toBeTruthy();
  }));
});
