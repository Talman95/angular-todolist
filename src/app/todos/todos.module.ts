import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './components/todos/todos.component'
import { HttpClientModule } from '@angular/common/http'
import { TodoComponent } from './components/todo/todo.component'
import { FormsModule } from '@angular/forms'
import { TasksComponent } from 'src/app/todos/components/tasks/tasks.component'
import { TaskComponent } from './components/task/task.component'
import { SharedModule } from 'src/app/shared/shared.module'

@NgModule({
  declarations: [TodosComponent, TodoComponent, TasksComponent, TaskComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TodosRoutingModule,
    FormsModule,
    SharedModule,
  ],
})
export class TodosModule {}
