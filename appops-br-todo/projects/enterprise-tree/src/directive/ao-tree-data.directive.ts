import { Directive, OnInit, Input } from '@angular/core';
import { EnterpriseTreeComponent } from '../lib/enterprise-tree.component';

@Directive({
  selector: '[ao-tree-data]'
})
export class AoTreeDataDirective implements OnInit {

  @Input() treeData;

  constructor(private enterpTreeComp: EnterpriseTreeComponent) { }

  ngOnInit(): void {
    this.enterpTreeComp.setTreeData = this.treeData;
  }

}
