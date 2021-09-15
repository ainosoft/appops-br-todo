import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EnterpriseGridComponent } from './enterprise-grid.component';
import { CommonModule } from '@angular/common';

import { MaterialModuleSet } from '../common/material-module';
import { AoGridDataDirective } from '../directive/ao-grid-data.directive';
import { AoActionsDirective } from '../directive/ao-actions.directive';
import { AoGridConfigDirective } from '../directive/ao-grid-config.directive';

@NgModule({
  declarations: [EnterpriseGridComponent, AoGridDataDirective, AoActionsDirective, AoGridConfigDirective],
  imports: [
    CommonModule,
    MaterialModuleSet,
  ],
  exports: [EnterpriseGridComponent, AoGridDataDirective,AoActionsDirective, AoGridConfigDirective],
  providers: [ EnterpriseGridComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class EnterpriseGridModule { }
