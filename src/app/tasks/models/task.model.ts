export class TaskModel {
    title:string;
    completed:boolean;
    text: string;
    id:string;

    constructor(){
        this.title = '';
        this.completed = false;
        this.text = '';
        this.id = '';
    }
}