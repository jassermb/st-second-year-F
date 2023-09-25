import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ThirdComponent } from './third/third.component';
import { GalleriaModule } from 'primeng/galleria';
import { FourthComponent } from './fourth/fourth.component';
import { ZeroComponent } from './zero/zero.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SignupComponent } from './signup/signup.component';
import { RecMpComponent } from './rec-mp/rec-mp.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdComponent,
    FourthComponent,
    ZeroComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    RecMpComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule ,PaginatorModule,
    BrowserAnimationsModule,TableModule,HttpClientModule,
    GalleriaModule, PasswordModule,ButtonModule,DividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
