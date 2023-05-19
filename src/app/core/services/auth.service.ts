import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { CommonResponse } from 'src/app/core'
import { Me } from 'src/app/core'
import { ResultCodeEnum } from 'src/app/core'
import { Router } from '@angular/router'

export interface LoginData {
  email: string | null
  password: string
  rememberMe: boolean
  captcha?: boolean
}

@Injectable()
export class AuthService {
  isAuth = false

  constructor(private http: HttpClient, private router: Router) {}

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
        }
        this.resolveAuthRequest()
      })
  }

  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login'])
        }
      })
  }

  login(data: Partial<LoginData>) {
    this.http
      .post<CommonResponse<{ userId: number }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/'])
        }
      })
  }
}
