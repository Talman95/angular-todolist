import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { CommonResponse } from 'src/app/core'
import { Me } from 'src/app/core'
import { ResultCodeEnum } from 'src/app/core'
import { Router } from '@angular/router'
import { NotifyService } from 'src/app/core/services/notify.service'
import { catchError, EMPTY } from 'rxjs'

export interface LoginData {
  email: string | null
  password: string
  rememberMe: boolean
  captcha?: boolean
}

@Injectable()
export class AuthService {
  isAuth = false
  isLoggedIn = false

  constructor(
    private http: HttpClient,
    private router: Router,
    private notify: NotifyService
  ) {}

  resolveAuthRequest: Function = () => {}

  authRequest = new Promise(res => {
    this.resolveAuthRequest = res
  })

  authMe() {
    this.http
      .get<CommonResponse<Me>>(`${environment.baseUrl}/auth/me`)
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isLoggedIn = true
        }

        this.isAuth = true
        this.resolveAuthRequest()
      })
  }

  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isLoggedIn = false
          this.router.navigate(['/login'])
        } else {
          this.notify.showError(res.messages[0])
        }
      })
  }

  login(data: Partial<LoginData>) {
    this.http
      .post<CommonResponse<{ userId: number }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isLoggedIn = true
          this.router.navigate(['/'])
        } else {
          this.notify.showError(res.messages[0])
        }
      })
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notify.showError(err.message)
    return EMPTY
  }
}
