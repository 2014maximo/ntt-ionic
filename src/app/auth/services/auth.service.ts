import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private apiUrl = environment.apiUrl
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User|undefined {
    if(!this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ):Observable<User>{

    const usuario = {email: email, password: password};
    const claveSecreta = 'A456';
    const objetoUsuarioCifrado = CryptoJS.AES.encrypt(JSON.stringify(usuario), claveSecreta).toString();
    localStorage.setItem(claveSecreta, objetoUsuarioCifrado);
    // ESTE SERÍA UN CIFRADO PARA ENVIAR A UNA API REAL QUE VALIDA LA EXISTENCIA DE USUARIO Y DEVUELVE UN TOKEN VÁLIDO


    return this.http.post<User>(`${ this.apiUrl }`, usuario)
      .pipe(
        tap( user => {
          this.user = user
        }),
        tap( user => {
          localStorage.setItem('usuario', email);
        }));
  }

  logout(){
    this.user = undefined;
    localStorage.removeItem('usuario');
  }

  checkAuthentication():Observable<boolean>{
    let ref = 'A456';
    let cfr = localStorage.getItem(ref);
    const objetoUsuarioDescifrado = CryptoJS.AES.decrypt(cfr, ref).toString(CryptoJS.enc.Utf8);

    if(!localStorage.getItem('usuario')) return of(false);

    return of(true);/* this.http.post<User>(`${ this.apiUrl }`, objetoUsuarioDescifrado)
      .pipe(
        tap( user => this.user = user ),
        map( user => !!user ),
        catchError( err => of(false))
      ) */
  }

}
