import { Injectable } from '@angular/core';

import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private request: RequestService) {}

  getTop() {
    return this.request.get('movies/top20');
  }

  getDetails(id) {
    return this.request.get(`movies/details/${id}`);
  }

  comment(id, params) {
    return this.request.send(params, `movies/comment/${id}`);
  }

  addRating(username, params) {
    return this.request.send(params, `users/${username}/ratings`);
  }

  addToFavorites(username, params) {
    return this.request.send(params, `users/${username}/movies`, 'PUT');
  }

  getFavorites(username) {
    return this.request.get(`users/${username}/movies`);
  }
}
