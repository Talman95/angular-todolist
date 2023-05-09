import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './components/todos/todos.component'
import { HttpClientModule } from '@angular/common/http'
import { TodoComponent } from './components/todos/todo/todo.component'
import { FormsModule } from '@angular/forms'
import { TasksComponent } from 'src/app/todos/components/todos/todo/tasks/tasks.component'
import { TaskComponent } from './components/todos/todo/tasks/task/task.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { TodoFilterComponent } from './components/todos/todo/todo-filter/todo-filter.component'

@NgModule({
  declarations: [
    TodosComponent,
    TodoComponent,
    TasksComponent,
    TaskComponent,
    TodoFilterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TodosRoutingModule,
    FormsModule,
    SharedModule,
  ],
})
export class TodosModule {}
