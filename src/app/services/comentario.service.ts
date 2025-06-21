import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.Service';

@Injectable({ providedIn: 'root' })
export class ComentarioService {
  private apiUrl = 'https://socialapipeliculas.onrender.com/api/comentarios';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getComentarios(tweetId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/tweet/${tweetId}`);
  }

  comentar(tweetId: number, contenido: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    return this.http.post(`${this.apiUrl}/crear/${tweetId}`, { contenido }, { headers });
  }
}
