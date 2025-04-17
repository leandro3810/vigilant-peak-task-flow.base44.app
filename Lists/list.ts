class List {
    private items: string[];

    constructor() {
        this.items = [];
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    removeItem(item: string): void {
        this.items = this.items.filter(i => i !== item);
    }

    getItems(): string[] {
        return this.items;
    }
}

export default List;
