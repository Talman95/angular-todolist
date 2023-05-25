import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { CredentialsInterceptor } from 'src/app/core'
import { HeaderComponent } from './layout/header/header.component'
import { AuthService } from './services/auth.service'
import { NotifyService } from 'src/app/core/services/notify.service'

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true,
    },
    AuthService,
    NotifyService,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
