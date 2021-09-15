export class ActionConfig {
    public name: string;
    public enable: boolean;
    public token: string;
    public isBulk: boolean;
    public type: string;
    public positionType: string;
    public isIcon: boolean;
    public iconName: string;
    public tooltip: string;

    /**
     * 
     * @param name action name
     * @param enable action enable boolean value
     * @param token action token e.g. on-button-click
     * @param type action type (hover or core)
     * @param positionType action position type (whether in-place or in-selector)
     * @param icon whether icon action, boolean value
     * @param iconName action icon name/text to be displayed.
     * @param tooltip tooltip string
     */
    public constructor(name: string, enable: boolean, token: string, isBulk: boolean, type?: string, positionType?: string, icon?: boolean, iconName?: string, tooltip?: string) {
        this.name = name;
        this.enable = enable;
        this.token = token;
        this.isBulk = isBulk;
        this.type = type;
        this.positionType = positionType;
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
    public get getIsBulk(): boolean {
        return this.isBulk;
    }
    public set setIsBulk(value: boolean) {
        this.isBulk = value;
    }
    public get getType(): string {
        return this.type;
    }
    public set setType(value: string) {
        this.type = value;
    }
    public get getPositionType(): string {
        return this.positionType;
    }
    public set setPositionType(value: string) {
        this.positionType = value;
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