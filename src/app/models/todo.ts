export class Todo {
    title: string;
    pk: number;
    completed: boolean;
    editing: boolean;

    constructor(title: string, pk: number = 0, completed: boolean = false) {
        this.pk = pk;
        this.title = title;
        this.completed = completed;
        this.editing = false;
    }
}

