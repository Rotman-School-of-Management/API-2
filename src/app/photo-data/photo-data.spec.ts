import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoData } from './photo-data';

describe('TodoData', () => {
  let component: TodoData;
  let fixture: ComponentFixture<TodoData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoData],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
