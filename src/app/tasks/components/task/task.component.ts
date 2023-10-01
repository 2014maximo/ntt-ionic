import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ITask } from '../../interface/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent  implements OnInit {

  @Input() public tarea: ITask = {
    completed:false,
    text:'',
    id:1
  };

  @Output() envioId: EventEmitter<any> =  new EventEmitter();

  constructor() { }

  ngOnInit() {}

  marcar(){
    this.tarea.completed = !this.tarea.completed
  }

  borrar(){
    this.envioId.emit()
  }

}
