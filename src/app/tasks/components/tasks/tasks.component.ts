import { Component, OnInit, ViewChild } from '@angular/core';
import { ITask } from '../../interface/task.interface';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { TaskComponent } from '../task/task.component';
import { TaskModel } from '../../models/task.model';

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
  tarea = new TaskModel();
  usuario = '';

  ingreso = new FormGroup({
    title: new FormControl(''),
    completed: new FormControl(),
    text: new FormControl(''),
  });

  constructor(private authService: AuthService, private router:Router, public modalController: ModalController) {}

  ngOnInit() {
    this.cargarStorage();
    this.usuario = localStorage.getItem('usuario');
  }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  agregarTarea() {
    let id =( this.tareas.length+1).toString();
    let tarea = {text:this.ingreso.value.text, completed: false, id: id, title:this.ingreso.value.title}
    this.tareas.push(tarea);
    let usuario = localStorage.getItem('usuario');
    localStorage.setItem(usuario, JSON.stringify(this.tareas) );
    this.ingreso.reset();
  }

  borrar(id) {
    this.tareas.splice(-id, 1);
    let usuario = localStorage.getItem('usuario');
    localStorage.setItem(usuario, JSON.stringify(this.tareas));
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
    let usuario = localStorage.getItem('usuario');
    if(localStorage.getItem(usuario)){
      console.log(usuario, 'entro a cargar');
      this.tareas = JSON.parse(localStorage.getItem(usuario)) as ITask[];
    }
  }

  marcar(id:string){
    this.tareas[id].completed = !this.tareas[id].completed;
  }

  cargarTarea(tarea: ITask){
    this.modalCargar(tarea);
  }

  async modalCargar(tarea: ITask){
    const modal = await this.modalController.create({
      component: TaskComponent, // Reemplaza con el nombre de tu componente modal
      componentProps: { // Opcional: Puedes pasar datos al modal utilizando componentProps
        parametro: tarea,
      },
    });
    
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.tarea = data;
      this.tareas = this.tareas.filter(objeto => {
        !objeto.id.includes(this.tarea.id)
      });
      console.log(this.tareas, 'TAREAS');
      let tarea = {text:this.tarea.text, completed: false, id: this.tarea.id, title:this.tarea.title}
      this.tareas.push(tarea);
      let usuario = localStorage.getItem('usuario');
      localStorage.setItem(usuario, JSON.stringify(this.tareas) );
    }
  }

  agregarNuevaTarea(){
    this.abrirModal();
  }

  async abrirModal() {
    this.tarea = new TaskModel();
    const modal = await this.modalController.create({
      component: TaskComponent,

    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.tarea = data;
      let tarea = {text:this.tarea.text, completed: false, id: this.tarea.id, title:this.tarea.title}
      this.tareas.push(tarea);
      let usuario = localStorage.getItem('usuario');
      localStorage.setItem(usuario, JSON.stringify(this.tareas) );
    }
  }
  
  
  


}