import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {
  password: string = '';
  showPassword: boolean = false;
  paises: any[]=[];

  ingreso = new FormGroup({
    usuario: new FormControl(''),
    clave: new FormControl(''),
  });

  constructor(private authService: AuthService,
              private utilService: UtilsService,
              private router: Router) { }

  ngOnInit() {
    this.utilService.listaPaises().subscribe( resp => {
      this.paises = resp.sort(function (x:any, y:any) {
        if (x.name.common < y.name.common) {
            return -1;
        }
        if (x.name.common > y.name.common) {
            return 1;
        }
        return 0;
      });
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  submitForm(form: FormGroup) {
    console.log(form);
    if (form.valid) {
      this.authService.login(form.value.usuario, form.value.clave).subscribe( resp => {
        console.log(resp);
        this.router.navigate(['tasks']);
      })
      
    } else {
      console.log('Por favor, complete todos los campos requeridos.');
    }
  }
  compararPorNombre(a:any, b:any) {
    const nombreA = a.nombre.toUpperCase(); // Convertir a mayúsculas para comparación sin distinción entre mayúsculas y minúsculas
    const nombreB = b.nombre.toUpperCase();
  
    if (nombreA < nombreB) {
      return -1;
    }
    if (nombreA > nombreB) {
      return 1;
    }
    return 0; // Los nombres son iguales
  }

}
