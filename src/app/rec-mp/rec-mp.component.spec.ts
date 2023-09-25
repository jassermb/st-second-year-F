import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecMpComponent } from './rec-mp.component';

describe('RecMpComponent', () => {
  let component: RecMpComponent;
  let fixture: ComponentFixture<RecMpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecMpComponent]
    });
    fixture = TestBed.createComponent(RecMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
