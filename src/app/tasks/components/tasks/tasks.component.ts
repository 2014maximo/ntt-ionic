import { Component, OnInit, ViewChild } from '@angular/core';
import { ITask } from '../../interface/task.interface';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent  implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = '';
  componente = TasksComponent;

  tareas: ITask[] = [];
  nuevaTarea: string = '';

  ingreso = new FormGroup({
    completed: new FormControl(''),
    text: new FormControl(''),
  });

  constructor() {
  }

  ngOnInit() {
    this.cargarStorage();
  }

  agregarTarea() {
    let id = this.tareas.length+1;
    let tarea = {text:this.ingreso.value.text, completed: false, id: id}
    this.tareas.push(tarea);
    localStorage.setItem('data', JSON.stringify(this.tareas) );
    this.ingreso.reset();
  }

  borrarTarea(id) {
    this.tareas.splice(id, 1);
    localStorage.setItem('data', JSON.stringify(this.tareas));
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.agregarTarea();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  submitForm(form: FormGroup) {
    console.log(form);
    if (form.valid) {
      
    } else {
      console.log('Por favor, complete todos los campos requeridos.');
    }
  }

  cargarStorage(){
    if(localStorage.getItem('data')){
      this.tareas = JSON.parse(localStorage.getItem('data')) as ITask[];
    }
  }


}