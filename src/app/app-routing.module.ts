import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdComponent } from './third/third.component';
import { FourthComponent } from './fourth/fourth.component';
import { ZeroComponent } from './zero/zero.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecMpComponent } from './rec-mp/rec-mp.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'aceuil', component:ZeroComponent },

  { path: 'logos', component:FirstPageComponent  },
  { path: 'second', component:SecondPageComponent  },
  { path: 'Third', component:ThirdComponent},
  { path: 'Fourth', component:FourthComponent },
  { path: 'login', component:LoginComponent },
  { path: 'Signup', component:SignupComponent },
  { path: 'RecMp', component:RecMpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
