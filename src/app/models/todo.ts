export class Todo {
    completed: boolean;
    editing: boolean;

    private _title: string = "";
    get title() {
        return this._title;
    }
    set title(value: string) {
        this._title = value.trim();
    }

    constructor(title: string) {
        this.completed = false;
        this.editing = false;
        this.title = title;
    }
}

