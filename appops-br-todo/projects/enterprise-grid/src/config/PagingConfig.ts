export class PagingConfig {

    public name: string;
    public enable: boolean;
    public token: string;
    public pagingType: string;
    public isIcon: boolean;
    public iconName: string;
    public tooltip: string;

    public constructor(name: string, enable: boolean, token: string, pagingType: string, icon?: boolean, iconName?: string, tooltip?: string) {
        this.name = name;
        this.enable = enable;
        this.token = token;
        this.pagingType = pagingType;
        this.isIcon = icon;
        this.iconName = iconName;
        this.tooltip = tooltip;
    }

    public get getName(): string {
        return this.name;
    }
    public set setName(value: string) {
        this.name = value;
    }
    public get getEnable(): boolean {
        return this.enable;
    }
    public set getEnable(value: boolean) {
        this.enable = value;
    }
    public get getToken(): string {
        return this.token;
    }
    public set setToken(value: string) {
        this.token = value;
    }
    public get getPagingType(): string {
        return this.pagingType;
    }
    public set setPagingType(value: string) {
        this.pagingType = value;
    }
    public get getIcon(): boolean {
        return this.isIcon;
    }
    public set setIcon(value: boolean) {
        this.isIcon = value;
    }
    public get getIconName(): string {
        return this.iconName;
    }
    public set setIconName(value: string) {
        this.iconName = value;
    }
    public get getTooltip(): string {
        return this.tooltip;
    }
    public set setTooltip(value: string) {
        this.tooltip = value;
    }

}