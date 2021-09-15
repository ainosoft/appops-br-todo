import { Directive, OnInit, Input } from '@angular/core';
import { EnterpriseGridComponent } from "../lib/enterprise-grid.component";
@Directive({
  selector: '[ao-actions]'
})
export class AoActionsDirective implements OnInit {
  @Input() actionDispatcher;
  constructor(private enterpGridComp: EnterpriseGridComponent) { }
 
  ngOnInit(): void {
    this.enterpGridComp.setActionDispatcher=this.actionDispatcher;
  }
}