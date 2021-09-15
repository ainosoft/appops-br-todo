export class ActionsAndToolsConfig {

    public name: string;
    public enable: boolean;
    public token: string;
    public level: number;
    public type: string;
    public isIcon: boolean;
    public nodePropertyName: string;
    public isApp: boolean;

    public constructor(name: string, enable: boolean, token: string, level?: number, type?: string, icon?: boolean, nodePropertyName?: string, isApp?: boolean) {
        this.name = name;
        this.enable = enable;
        this.token = token;
        this.level = level;
        this.type = type;
        this.isIcon = icon;
        this.nodePropertyName = nodePropertyName;
        this.isApp = isApp;
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
    public set setEnable(value: boolean) {
        this.enable = value;
    }
    public get getToken(): string {
        return this.token;
    }
    public set setToken(value: string) {
        this.token = value;
    }
    public get getLevel(): number {
        return this.level;
    }
    public set setLevel(value: number) {
        this.level = value;
    }
    public get getType(): string {
        return this.type;
    }
    public set setType(value: string) {
        this.type = value;
    }
    public get getIcon(): boolean {
        return this.isIcon;
    }
    public set setIcon(value: boolean) {
        this.isIcon = value;
    }
    public get getNodePropertyName(): string {
        return this.nodePropertyName;
    }
    public set setNodePropertyName(value: string) {
        this.nodePropertyName = value;
    }
    public get getApp(): boolean {
        return this.isApp;
    }
    public set setApp(value: boolean) {
        this.isApp = value;
    }
}