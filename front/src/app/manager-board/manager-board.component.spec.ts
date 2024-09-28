import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerBoardComponent } from './manager-board.component';

describe('ManagerBoardComponent', () => {
  let component: ManagerBoardComponent;
  let fixture: ComponentFixture<ManagerBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
