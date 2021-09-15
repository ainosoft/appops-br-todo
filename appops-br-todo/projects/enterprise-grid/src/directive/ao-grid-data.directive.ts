import { Directive, Input, OnInit, OnChanges } from '@angular/core';
import { EnterpriseGridComponent } from '../lib/enterprise-grid.component';
import { GridData } from '../action/GridData';

@Directive({
  selector: '[ao-grid-data]'
})
export class AoGridDataDirective implements OnInit{

  @Input() gridData:GridData;

  constructor(private enterpGridComp: EnterpriseGridComponent) { }

  ngOnInit(): void {
    this.enterpGridComp.setGridData = this.gridData;
    // console.log("Data Directive");
  }

}
