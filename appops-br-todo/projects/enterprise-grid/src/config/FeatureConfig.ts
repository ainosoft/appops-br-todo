export class FeatureConfig {

    public name: string;
    public enable: boolean;

    /**
     * 
     * @param name feature name
     * @param enable boolean value to show or hide the feature
     */
    public constructor(name: string, enable: boolean) {
        this.name = name;
        this.enable = enable;
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
}