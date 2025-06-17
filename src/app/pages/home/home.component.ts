import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TweetService } from '../../services/tweet.service';
import { ComentarioService } from '../../services/comentario.service';
import { ReaccionService } from '../../services/reaccion.service';
import { FormsModule } from '@angular/forms';
import { ReaccionesComponent } from '../../components/reacciones/reacciones.component'; // Ajusta la ruta si es distinta

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReaccionesComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  tweets: any[] = [];
  tweetForm: FormGroup;
  comentario: { [tweetId: number]: string } = {};

  constructor(
    private tweetService: TweetService,
    private comentarioService: ComentarioService,
    private reaccionService: ReaccionService,
    private fb: FormBuilder
  ) {
    this.tweetForm = this.fb.group({
      tweet: ['', Validators.required],
      imagenUrl: ['']
    });
  }

  ngOnInit(): void {
    this.cargarTweets();
  }

  cargarTweets() {
    this.tweetService.getTweets().subscribe(tweets => {
      this.tweets = tweets;
      this.tweets.forEach(tweet => {
        this.comentarioService.getComentarios(tweet.id).subscribe(coms => tweet.comentarios = coms);
        this.reaccionService.getContador(tweet.id).subscribe(cont => tweet.reacciones = cont);
      });
    });
  }

  crearTweet() {
    const tweet = this.tweetForm.value;
    this.tweetService.crearTweet(tweet).subscribe({
      next: () => {
        this.tweetForm.reset();
        this.cargarTweets();
      }
    });
  }

  comentar(tweetId: number, contenido: string) {
    if (!contenido) return;
    this.comentarioService.comentar(tweetId, contenido).subscribe(() => this.cargarTweets());
    this.comentario[tweetId] = '';
  }

  reaccionar(tweetId: number, tipo: string) {
    this.reaccionService.reaccionar(tweetId, tipo).subscribe(() => this.cargarTweets());
  }
}
