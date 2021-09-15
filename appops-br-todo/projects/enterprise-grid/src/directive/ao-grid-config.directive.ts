import { OnInit, Directive, Input, ElementRef } from "@angular/core";
import { EnterpriseGridComponent } from "../lib/enterprise-grid.component";

@Directive({
    selector: '[ao-grid-config]'
})
export class AoGridConfigDirective implements OnInit {

    @Input() gridConfig;
    
    constructor(private enterpGridComp: EnterpriseGridComponent) { }

    ngOnInit(): void {
        console.log(this.gridConfig);
        this.enterpGridComp.setGridConfig = this.gridConfig;
    }
}