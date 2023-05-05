import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditableSpanComponent } from './components/editable-span/editable-span.component'
import { FormsModule } from '@angular/forms'
import { AddItemComponent } from './components/add-item/add-item.component'

@NgModule({
  declarations: [EditableSpanComponent, AddItemComponent],
  imports: [CommonModule, FormsModule],
  exports: [EditableSpanComponent, AddItemComponent],
})
export class SharedModule {}
