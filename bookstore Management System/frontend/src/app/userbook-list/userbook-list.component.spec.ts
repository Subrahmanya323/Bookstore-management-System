import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookListComponent } from './userbook-list.component';

describe('UserbookListComponent', () => {
  let component: UserbookListComponent;
  let fixture: ComponentFixture<UserbookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserbookListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserbookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
