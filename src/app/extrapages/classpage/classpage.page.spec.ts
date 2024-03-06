import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClasspagePage } from './classpage.page';

describe('ClasspagePage', () => {
  let component: ClasspagePage;
  let fixture: ComponentFixture<ClasspagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClasspagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
