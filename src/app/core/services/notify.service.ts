import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class NotifyService {
  constructor(private toastr: ToastrService) {}

  showError(error: string) {
    this.toastr.error(error)
  }
}
