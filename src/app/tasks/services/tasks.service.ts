import { Injectable } from '@angular/core';
import { Lista } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  listas: Lista[] = [];

  constructor() {
    this.cargarStorage();
  }


  crearLista( titulo: string ) {
    const nuevaLista = new Lista(titulo);
    this.listas.push( nuevaLista );
    this.guardarStorage();
    return nuevaLista.id;
  }

  borrarLista( lista: Lista ) {
    this.listas = this.listas.filter( listaData => listaData.id !== lista.id );
    this.guardarStorage();
  }


  obtenerLista( id: string | number ) {
    id = Number(id);
    return this.listas.find(  listaData => listaData.id === id );
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas) );
  }

  cargarStorage() {
    let storageData = localStorage.getItem('data');

    if ( storageData != null ) {
      this.listas = JSON.parse( storageData );
    } else {
      this.listas = [];
    }
  }


}