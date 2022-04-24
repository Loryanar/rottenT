import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-profile-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class ProfileMoviePage implements OnInit {
  //creating properties
  profileId: string;
  movie_id: string;
  movie_title: string;
  description: string;
  username = localStorage.getItem('username');

  id: string;
  rating: number;

  movie;
  comment = [];
  ratinga = [];
  general_rating: number = 0;

  loading = false;

  is_favorite = false;

  //instantiating
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public navCtrl: NavController,
    private movieService: MoviesService
  ) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.loading = true;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const data = await this.movieService.getDetails(id);
    this.movie_id = data.details.id;
    this.movie_title = data.details.title;

    var sum = 0;
    data.ratings.forEach((element) => {
      sum += element.rating;
    });

    this.general_rating = sum / data.ratings.length;
    this.general_rating = Math.round(this.general_rating * 10) / 10;
    if (!this.general_rating) {
      this.general_rating = 0;
    }

    this.movie = data.details;
    this.comment = data.comments;
    this.ratinga = data.ratings;
    const userRatings = data.ratings.filter(
      (d) => (d.username = this.username)
    );
    this.rating = userRatings.length > 0 ? userRatings.pop().rating : 0;
    const favs = await this.movieService.getFavorites(this.username);
    this.is_favorite = Array.isArray(favs)
      ? !!favs.find((d) => d.id == this.movie_id)
      : false;

    this.loading = false;
  }

  async addComment() {
    await this.movieService.comment(this.movie_id, {
      username: this.username,
      movie_id: this.movie_id,
      description: this.description,
    });

    await this.getData();
  }

  async addToFavorites() {
    this.loading = true;
    await this.movieService.addToFavorites(this.username, {
      username: this.username,
      id: this.movie_id,
      title: this.movie_title,
    });
    await this.getData();
  }

  openTrailer() {
    window.open(this.movie.trailer, '_blank');
  }

  async addRating(i) {
    this.loading = true;
    await this.movieService.addRating(this.username, {
      username: this.username,
      id: this.movie_id,
      rating: i,
    });
    await this.getData();

    /*

    const rating = this.rating;
    const alert = await this.alertController.create({
      header: 'Rating added',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            fetch(
              'https://popcorntasters-api.herokuapp.com/users/' +
                this.username +
                '/ratings',
              {
                method: 'POST',
                headers: new Headers({
                  // Encabezados
                  'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                  username: this.username,
                  id: this.movie_id,
                  rating: rating,
                }),
              }
            )
              .then((response) => {
                console.log(response);
                if (response.redirected == true) {
                  window.location.replace(response.url);
                }
                console.log('New rating added...');
                window.location.reload();

                return response.json();
              })
              .then((r) => {
                console.log(r);
              })
              .catch((e) => console.log(e));
          },
        },
      ],
    });
    await alert.present();

    */
  }

  async addFav() {
    const rating = this.rating;
    const alert = await this.alertController.create({
      header: 'Movie Added to Favorites',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            fetch(
              'https://popcorntasters-api.herokuapp.com/users/' +
                this.username +
                '/movies',
              {
                method: 'PUT',
                headers: new Headers({
                  // Encabezados
                  'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                  username: this.username,
                  id: this.movie_id,
                  title: this.movie_title,
                }),
              }
            )
              .then((response) => {
                console.log('Movie added to favorites...');
                return response.json();
              })
              .then((r) => {
                console.log(r);
              })
              .catch((e) => console.log(e));
          },
        },
      ],
    });
    await alert.present();
  }
}
