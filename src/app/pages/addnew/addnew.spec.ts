import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Addnew } from './addnew';

describe('Addnew', () => {
  let component: Addnew;
  let fixture: ComponentFixture<Addnew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Addnew],
    }).compileComponents();

    fixture = TestBed.createComponent(Addnew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
