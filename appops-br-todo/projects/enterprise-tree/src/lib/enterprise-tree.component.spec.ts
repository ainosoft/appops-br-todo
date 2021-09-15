import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseTreeComponent } from './enterprise-tree.component';

describe('EnterpriseTreeComponent', () => {
  let component: EnterpriseTreeComponent;
  let fixture: ComponentFixture<EnterpriseTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
