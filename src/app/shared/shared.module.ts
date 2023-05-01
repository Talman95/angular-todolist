import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditableSpanComponent } from './components/editable-span/editable-span.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [EditableSpanComponent],
  imports: [CommonModule, FormsModule],
  exports: [EditableSpanComponent],
})
export class SharedModule {}
