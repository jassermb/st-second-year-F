// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  // Méthode pour envoyer un e-mail de réinitialisation du mot de passe
  sendResetPasswordEmail(email: string) {
    const resetPasswordEndpoint = `${this.apiUrl}/reset-password`;

    // Envoyer une requête POST à l'API backend pour envoyer l'e-mail de réinitialisation
    return this.http.post(resetPasswordEndpoint, { email });
  }
}
