import { Component, OnInit } from '@angular/core';
import { ITask } from '../../interface/task.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent  implements OnInit {

  tareas: ITask[] = [{completed:false, text:'hola'}];
  nuevaTarea: string = '';

  constructor() { }

  ngOnInit() {}

  agregarTarea() {
    if (this.nuevaTarea.trim() !== '') {
      this.tareas.push({ text: this.nuevaTarea, completed: false });
      this.nuevaTarea = '';
    }
  }

  borrarTarea(task: any) {
    const index = this.tareas.indexOf(task);
    if (index !== -1) {
      this.tareas.splice(index, 1);
    }
  }

}