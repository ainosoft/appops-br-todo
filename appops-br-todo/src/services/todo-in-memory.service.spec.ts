import { TestBed } from '@angular/core/testing';

import { TodoInMemoryService } from './todo-in-memory.service';

describe('TodoInMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoInMemoryService = TestBed.get(TodoInMemoryService);
    expect(service).toBeTruthy();
  });
});
