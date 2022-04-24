import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-user-top',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class UserTopPage implements OnInit {
  i = 0;

  data = [];

  top = [];

  loading = false;

  username = localStorage.getItem('username');

  constructor(private movies: MoviesService, private http: HttpClient) {}

  processTop(filterCb?) {
    this.top = [];
    const data = filterCb ? [...this.data].filter(filterCb) : [...this.data];
    while (data.length > 0) {
      const row = [];
      while (row.length < 1 && data.length > 0) {
        row.push(data.shift());
      }
      this.top[this.top.length] = row;
    }
  }

  search(text: string) {
    if (!text) this.processTop();
    else {
      this.processTop(({ title, description }) => {
        return (
          title.toLowerCase().includes(text.toLowerCase()) ||
          description.toLowerCase().includes(text.toLowerCase())
        );
      });
    }
  }

  async ngOnInit() {
    this.loading = true;
    try {
      const favs = await this.movies.getFavorites(this.username);
      this.data = await this.movies.getTop();
      this.processTop(({ id }) => !!favs.find((movie) => movie.id == id));
    } catch {
    } finally {
      this.loading = false;
    }
  }
}
