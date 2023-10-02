import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent  implements OnInit {

  ingreso = new FormGroup({
    completed: new FormControl(),
    text: new FormControl(''),
    title: new FormControl(''),
    id: new FormControl('')
  });

  tarea = new TaskModel();

  @Output() envioId: EventEmitter<any> =  new EventEmitter();

  constructor(private modalCtrl: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    if(this.navParams.get('parametro')){
      const datosPasados = this.navParams.get('parametro');
      this.ingreso.get('title').setValue(datosPasados.title);
      this.ingreso.get('text').setValue(datosPasados.text);
      this.ingreso.get('id').setValue(datosPasados.id);
      this.ingreso.get('completed').setValue(datosPasados.completed);
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.tarea.completed = false;
    this.tarea.id = `${this.ingreso.value.title}${this.idRandom()}`;
    this.tarea.text = this.ingreso.value.text;
    this.tarea.title = this.ingreso.value.title;
    return this.modalCtrl.dismiss(this.tarea, 'confirm');
  }
  idRandom():string{
    let valor = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
    return valor.toString();
  }


}
