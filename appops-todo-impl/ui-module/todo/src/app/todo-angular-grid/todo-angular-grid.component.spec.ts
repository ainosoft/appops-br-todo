import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAngularGridComponent } from './todo-angular-grid.component';

describe('TodoAngularGridComponent', () => {
  let component: TodoAngularGridComponent;
  let fixture: ComponentFixture<TodoAngularGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoAngularGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAngularGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
