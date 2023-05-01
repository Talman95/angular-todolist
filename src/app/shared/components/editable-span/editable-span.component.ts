import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'todo-editable-span',
  templateUrl: './editable-span.component.html',
  styleUrls: ['./editable-span.component.scss'],
})
export class EditableSpanComponent {
  @Input() title!: string
  @Output() updateTitleEvent = new EventEmitter<string>()

  isEditMode = false
  updatedTitle = ''

  activateEditMode() {
    this.updatedTitle = this.title
    this.isEditMode = true
  }

  deactivateEditMode() {
    this.updateTitleEvent.emit(this.updatedTitle)
    this.isEditMode = false
  }

  onEnterPress() {
    this.deactivateEditMode()
  }
}
