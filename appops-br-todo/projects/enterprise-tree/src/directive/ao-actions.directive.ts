import { Directive, Input, OnInit } from '@angular/core';
import { BaseActionDispatcher } from '../action/BaseActionDispatcher';
import { EnterpriseTreeComponent } from '../lib/enterprise-tree.component';

@Directive({
  selector: '[ao-actions]'
})
export class AoActionsDirective implements OnInit{

  @Input() actionDispatcher;

  constructor(private enterpTreeComp: EnterpriseTreeComponent) { }

  ngOnInit(): void {
    this.enterpTreeComp.setActionDispatcher = this.actionDispatcher;
  }

}
