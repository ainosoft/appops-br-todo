import { Directive, Input, OnInit } from '@angular/core';
import { EnterpriseTreeComponent } from '../lib/enterprise-tree.component';

@Directive({
  selector: '[ao-tree-config]'
})
export class AoTreeConfigDirective implements OnInit {

  @Input() treeConfig;

  constructor(private enterpTreeComp: EnterpriseTreeComponent) { }

  ngOnInit(): void {
    this.enterpTreeComp.setTreeConfig = this.treeConfig;
  }

}
