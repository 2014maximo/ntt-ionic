import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() public componente: any;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {}

  get user():User | undefined {
    return this.authService.currentUser;
  }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
