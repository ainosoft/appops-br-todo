import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { EnterpriseGridComponent } from './enterprise-grid.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModuleSet } from 'core-components-lib/enterprise-grid/src/common/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnterpriseGridService } from './enterprise-grid.service';
import { ColumnDef } from '../config/ColumnDef';
import { GridConfig } from '../config/GridConfig';
import { ActionConfig } from '../config/Action Config';
import { mockUserData, mockDisplayedColumns, gridHeader, enableCreateIcon, enableSearchPlaceholder, enableSearchBox, enableToolBar } from '../common/mock-data/user-mocks';

describe('EnterpriseGridComponent', () => {
  let component: EnterpriseGridComponent;
  let fixture: ComponentFixture<EnterpriseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseGridComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      imports: [ MaterialModuleSet, BrowserAnimationsModule],
      providers: [ EnterpriseGridService, ColumnDef, GridConfig, ActionConfig ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get an observable user list values from EnterpriseGridService', () => {
    const eGridService: EnterpriseGridService = TestBed.get(EnterpriseGridService);
    
    eGridService.setGridList(mockUserData);

    eGridService.currentList.subscribe((list) => {
      expect(list).toBeDefined();
      expect(list.length).toBe(4);

      expect(list[0].firstName).toEqual('Nandita');
      expect(list[1].firstName).toEqual('Shubham');
      expect(list[2].firstName).toEqual('Vinay');
      expect(list[3].firstName).toEqual('Surbhi');

      expect(list[0].email).toEqual('nandita@gmail.com');
      expect(list[1].email).toEqual('shubham@gmail.com');
      expect(list[2].email).toEqual('vinay@gmail.com');
      expect(list[3].email).toEqual('surbhi@gmail.com');
    });
  });

  it('should get an observable mock column defs from ColumnDef', () => {
    const service: EnterpriseGridService = TestBed.get(EnterpriseGridService);
    const columnDef: ColumnDef = TestBed.get(ColumnDef);
 
    service.setColumnDefs(mockDisplayedColumns);

    columnDef.currentColDef.subscribe(colDefs => {
      expect(colDefs).toBeDefined();
      expect(colDefs.length).toBe(4);

      expect(colDefs[0].name).toEqual('checkbox');
      expect(colDefs[1].name).toEqual('firstName');
      expect(colDefs[2].name).toEqual('lastName');
      expect(colDefs[3].name).toEqual('email');

      expect(colDefs[0].item).toEqual('');
      expect(colDefs[1].item).toEqual('First Name');
      expect(colDefs[2].item).toEqual('Last Name');
      expect(colDefs[3].item).toEqual('Email');
    });
  });

  it('should get an observable mock grid header from GridConfig', () => {
    const service: EnterpriseGridService = TestBed.get(EnterpriseGridService);
    const gridConfig: GridConfig = TestBed.get(GridConfig);
    
    service.setGridHeader(gridHeader);

    gridConfig.currentGridHeader.subscribe(gridHeader => {
      expect(gridHeader).toBeDefined();
    });
  });

  it('should get an observable mock create Icon value from ActionConfig', () => {
    const service: EnterpriseGridService = TestBed.get(EnterpriseGridService);
    const actionConfig: ActionConfig = TestBed.get(ActionConfig);
    
    service.enableCreateIcon(enableCreateIcon);

    actionConfig.currCreateIconValue.subscribe(createIconValue => {
      expect(createIconValue).toBeDefined();
      expect(createIconValue).toEqual(true);
    });
  });

  it('should get an observable mock search placeholder Icon value from ActionConfig', () => {
    const service: EnterpriseGridService = TestBed.get(EnterpriseGridService);
    const actionConfig: ActionConfig = TestBed.get(ActionConfig);
    
    service.enableSearchPlaceholder(enableSearchPlaceholder);

    actionConfig.currSearchPlaceholderValue.subscribe(searchPhIconValue => {
      expect(searchPhIconValue).toBeDefined();
      expect(searchPhIconValue).toEqual('none');
    });
  });

  it('should get an observable mock search box Icon value from ActionConfig', () => {
    const service: EnterpriseGridService = TestBed.get(EnterpriseGridService);
    const actionConfig: ActionConfig = TestBed.get(ActionConfig);
    
    service.enableSearchBox(enableSearchBox);

    actionConfig.currSearchBoxValue.subscribe(searchBoxIconValue => {
      expect(searchBoxIconValue).toBeDefined();
      expect(searchBoxIconValue).toEqual('block');
    });
  });

  it('should get an observable mock toolbar Icon value from ActionConfig', () => {
    const service: EnterpriseGridService = TestBed.get(EnterpriseGridService);
    const actionConfig: ActionConfig = TestBed.get(ActionConfig);
    
    service.enableToolBar(enableToolBar);

    actionConfig.curreToolbarValue.subscribe(toolbarIconValue => {
      expect(toolbarIconValue).toBeDefined();
      expect(toolbarIconValue).toEqual(true);
    });
  });

});
