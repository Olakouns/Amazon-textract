import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractItemsComponent } from './extract-items.component';

describe('ExtractItemsComponent', () => {
  let component: ExtractItemsComponent;
  let fixture: ComponentFixture<ExtractItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtractItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtractItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
