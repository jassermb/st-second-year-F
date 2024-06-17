import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient,private router: Router) { }

  login() {
    console.log(this.email);
    console.log(this.password);

    if (!this.isEmailValid(this.email) || !this.isPasswordValid(this.password)) {
      alert("Veuillez remplir correctement les champs d'e-mail et de mot de passe.");
      return;
    }

    let bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:9992/user/login", bodyData).subscribe(
      (resultData: any) => {
        console.log(resultData);

        if (resultData.status) {
          alert("Bienvenue");
          this.router.navigateByUrl('/aceuil');
        } else {
          alert("Incorrect Email or Password");
          console.log("Error login");
        }
      },
      (error) => {
        alert("Une erreur s'est produite lors de l'envoi de la demande.");
        console.log("Error sending login request:", error);
      }
    );
  }

  private isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  private isPasswordValid(password: string): boolean {
    return password.length >= 6;
  }
}
