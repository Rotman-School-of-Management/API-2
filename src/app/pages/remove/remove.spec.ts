import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Remove } from './remove';

describe('Remove', () => {
  let component: Remove;
  let fixture: ComponentFixture<Remove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Remove],
    }).compileComponents();

    fixture = TestBed.createComponent(Remove);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
