import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OnePieceService {

  http = inject(HttpClient);


  //obtener temporadas, peticiones
  getSeasons() {
    return this.http.get(environment.baseURL + environment.seasons)
  }

  getEpisodesBySeasons(id: string) {
    return this.http.get(environment.baseURL + environment.episodes_by_season + id)
  }


  //llamado a episodios por numero
  getEpisodeByNumber(number: string) {
    return this.http.get(environment.baseURL + environment.episode + number)
  }
} 