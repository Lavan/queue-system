import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteQueueDetailComponent } from './site-queue-detail.component';

describe('SiteQueueDetailComponent', () => {
  let component: SiteQueueDetailComponent;
  let fixture: ComponentFixture<SiteQueueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteQueueDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteQueueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
