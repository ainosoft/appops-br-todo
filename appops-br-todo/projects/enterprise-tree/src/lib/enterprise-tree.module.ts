import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EnterpriseTreeComponent } from './enterprise-tree.component';
import { CommonModule } from '@angular/common';
import { MaterialModuleSet } from '../common/material-module';
import { AoTreeDataDirective } from '../directive/ao-tree-data.directive';
import { AoActionsDirective } from '../directive/ao-actions.directive';
import { AoTreeConfigDirective } from '../directive/ao-tree-config.directive';

@NgModule({
  declarations: [EnterpriseTreeComponent, AoTreeDataDirective, AoActionsDirective, AoTreeConfigDirective],
  imports: [
    CommonModule,
    MaterialModuleSet,
  ],
  exports: [EnterpriseTreeComponent, AoTreeDataDirective, AoActionsDirective, AoTreeConfigDirective],
  providers: [EnterpriseTreeComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class EnterpriseTreeModule { }
