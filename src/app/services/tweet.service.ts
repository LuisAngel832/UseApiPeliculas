import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.Service';

@Injectable({ providedIn: 'root' })
export class TweetService {
  private apiUrl = 'https://socialapipeliculas.onrender.com/api/tweets';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getTweets(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/publicos`);
  }

  crearTweet(tweet: any): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/crear`, tweet, { headers });
  }
}
