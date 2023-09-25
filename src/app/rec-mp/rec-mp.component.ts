import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; 
@Component({
  selector: 'app-rec-mp',
  templateUrl: './rec-mp.component.html',
  styleUrls: ['./rec-mp.component.css']
})
export class RecMpComponent {
  email: string = '';
  message: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.sendResetPasswordEmail(this.email)
      .subscribe(
        () => {
          this.message = 'Un e-mail de réinitialisation a été envoyé à votre adresse e-mail.';
        },
        (error) => {
          this.message = 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail de réinitialisation.';
        }
      );
  }
}