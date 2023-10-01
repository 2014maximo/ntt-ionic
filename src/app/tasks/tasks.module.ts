import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { IonicModule } from '@ionic/angular';
import { FiltroCompletadoPipe } from './pipe/tasks.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TasksComponent,
    TaskComponent,
    FiltroCompletadoPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TasksRoutingModule
  ],
  exports:[
    FiltroCompletadoPipe
  ]
})
export class TaskModule { }
