import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reacciones',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './reacciones.component.html'
})
export class ReaccionesComponent implements OnInit {
  @Input() tweetId!: number;

  reacciones = [
    { tipo: 'REACTION_LIKE', icono: '👍', contador: 0 },
    { tipo: 'REACTION_LOVE', icono: '❤️', contador: 0 },
    { tipo: 'REACTION_HATE', icono: '😡', contador: 0 },
    { tipo: 'REACTION_SAD', icono: '😢', contador: 0 },
    { tipo: 'REACTION_ANGRY', icono: '😠', contador: 0 },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarContadores();
  }

  cargarContadores() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.reacciones.forEach(reaccion => {
      const url = `http://localhost:8080/api/reacciones/tweet/${this.tweetId}/contador?tipo=${reaccion.tipo}`;
      this.http.get<number>(url, { headers }).subscribe({
        next: count => reaccion.contador = count,
        error: err => console.error(`Error cargando contador de ${reaccion.tipo}`, err)
      });
    });
  }

  reaccionar(tipo: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const url = `http://localhost:8080/api/reacciones/tweet/${this.tweetId}?tipo=${tipo}`;

    this.http.post(url, {}, { headers }).subscribe({
      next: () => {
        console.log(`Reaccionó con ${tipo}`);
        this.cargarContadores();
      },
      error: err => console.error('Error al reaccionar', err)
    });
  }
}
