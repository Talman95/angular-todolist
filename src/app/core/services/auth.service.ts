import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { CommonResponse } from 'src/app/core'
import { Me } from 'src/app/core'
import { ResultCodeEnum } from 'src/app/core'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth = false

  constructor(private http: HttpClient) {}

  resolveAuthRequest: Function = () => {}

  authRequest = new Promise(res => {
    this.resolveAuthRequest = res
  })

  authMe() {
    this.http
      .get<CommonResponse<Me>>(`${environment.baseUrl}/auth/me`)
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true

          this.resolveAuthRequest()
        }
      })
  }
}
