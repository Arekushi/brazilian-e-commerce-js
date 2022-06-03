export abstract class Commander {

    abstract init(): Promise<void>;

    constructor(
        public readonly name: string
    ) {
        this.name = name;
    }
}
