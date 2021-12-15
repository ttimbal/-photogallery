import { TestBed } from '@angular/core/testing';

import { SimpleEventService } from './simple-event.service';

describe('SimpleEventsService', () => {
  let service: SimpleEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
