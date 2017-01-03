/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActiveBusinessService } from './active-business.service';

describe('ActiveBusinessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveBusinessService]
    });
  });

  it('should ...', inject([ActiveBusinessService], (service: ActiveBusinessService) => {
    expect(service).toBeTruthy();
  }));
});
