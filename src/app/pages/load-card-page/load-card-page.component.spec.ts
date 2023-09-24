import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCardPageComponent } from './load-card-page.component';

describe('LoadCardPageComponent', () => {
  let component: LoadCardPageComponent;
  let fixture: ComponentFixture<LoadCardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
