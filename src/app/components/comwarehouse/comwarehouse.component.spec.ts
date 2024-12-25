import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComwarehouseComponent } from './comwarehouse.component';

describe('ComwarehouseComponent', () => {
  let component: ComwarehouseComponent;
  let fixture: ComponentFixture<ComwarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComwarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComwarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
