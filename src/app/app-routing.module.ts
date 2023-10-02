import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('../app/auth/auth.module').then( m => m.AuthModule),
    canActivate:[ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path: 'tasks',
    loadChildren: () => import('../app/tasks/tasks.module').then( m => m.TaskModule),
    canActivate:[ AuthGuard ],
    canMatch: [ AuthGuard ]
  },
  {
    path: '404',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
