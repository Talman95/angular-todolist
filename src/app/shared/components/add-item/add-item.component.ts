import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'todo-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent {
  @Output() addItemEvent = new EventEmitter<string>()

  title = ''

  addItem() {
    if (this.title.trim() !== '') {
      this.addItemEvent.emit(this.title)

      this.title = ''
    }
  }

  onEnterPress() {
    this.addItem()
  }
}
