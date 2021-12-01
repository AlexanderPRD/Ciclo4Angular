import { TestBed } from '@angular/core/testing';

import { EncomiendaService } from './encomienda.service';

describe('EncomiendaService', () => {
  let service: EncomiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncomiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
