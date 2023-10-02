import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent  implements OnInit {
  password: string = '';
  showPassword: boolean = false;
  paises: any[]=[];
  isAlertOpen = false;
  public alertButtons = ['OK'];
  noValido='';

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

  onLogin(form: FormGroup) {
    console.log(form);
    if (form.valid) {
      this.authService.login(form.value.usuario, form.value.clave).subscribe({
        next: (resp) =>{
          this.router.navigate(['tasks']);
        },
        error:(e)=> {
          console.error(e,'ERORRESERSE');
          this.ingreso.reset();
          this.setOpen(true);
        }
      })
      
    } else {
      console.log('Por favor, complete todos los campos requeridos.');
    }
  }

  paginaRegistrar(){
    this.router.navigate(['registrar']);
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
    this.ingreso.reset();
    this.noValido = 'Usuario o Clave erróneos.'
  }

}
