import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractListComponent } from './extract-list.component';

describe('ExtractListComponent', () => {
  let component: ExtractListComponent;
  let fixture: ComponentFixture<ExtractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
