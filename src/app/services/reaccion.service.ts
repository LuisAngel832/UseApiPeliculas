import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.Service';

@Injectable({ providedIn: 'root' })
export class ReaccionService {
  private apiUrl = 'http://localhost:8080/api/reacciones';

  constructor(private http: HttpClient, private auth: AuthService) {}

  reaccionar(tweetId: number, tipo: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(`${this.apiUrl}/tweet/${tweetId}`, { tipo }, { headers });
  }

  getContador(tweetId: number) {
    return this.http.get<{ likes: number, loves: number }>(`${this.apiUrl}/tweet/${tweetId}/contador`);
  }
}
