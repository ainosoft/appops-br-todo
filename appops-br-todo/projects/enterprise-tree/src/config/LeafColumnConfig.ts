export class LeafColumnConfig {
    private name: String;
    private item: String;
    private position: number;
   
    constructor(name , item , position){
        this.name=name;
        this.item=item;
        this.position=position;
    }

    public get getname(): String {
        return this.name;
    }
    public set setname(value: String) {
        this.name = value;
    }
    public get getitem(): String {
        return this.item;
    }
    public set setitem(value: String) {
        this.item = value;
    }
    public get getPosition(): number {
        return this.position;
    }
    public set setPosition(value: number) {
        this.position = value;
    }
}