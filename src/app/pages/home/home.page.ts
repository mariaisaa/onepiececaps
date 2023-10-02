import { Component, OnInit, inject } from '@angular/core';
import { Season } from 'src/app/models/season.model';
import { LanguageService } from 'src/app/services/language.service';
import { OnePieceService} from 'src/app/services/one-piece.service';
import { Episode } from 'src/app/models/episode.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  episode_number="";
  seasons: Season [] = [];
  episodes: Episode [] = [];
  selectedSeason = '';

  loading: boolean = false;
  limitError: boolean = false;

  languageSvc = inject(LanguageService);
  onePieceSvc = inject(OnePieceService);  
  selectedLanguage = '';

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('Language') as string;
      this.getSeasons(); 
  }

  ////cambiar idioma
  setLanguage(){
    this.languageSvc.setLanguage(this.selectedLanguage);
    this.getSeasons();
  }


  // llamar a las temporadas
  getSeasons(){

this.loading = true;

    this.onePieceSvc.getSeasons().subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        this.seasons = res.seasons;
        this.selectedSeason = this.seasons[0].id; //se ubica para que se inicie en la season 1
        
        this.getEpisodesBySeasons()
      },
       error: (err: any) => {
        this.loading = false;
        if (err.status === 429) this.limitError = true;
       }
    })
  }

  //llamar episodios

  getEpisodesBySeasons(){

    this.loading = true;

    this.onePieceSvc.getEpisodesBySeasons(this.selectedSeason).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        this.episodes = res.episodes;
        
      }   
    })
  }


  //llamado para traer el episodio por numero
  getEpisodeByNumber(){
    if (this.episode_number){ 
      this.loading = true;
      this.onePieceSvc.getEpisodeByNumber(this.episode_number).subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log(res);
          this.episodes = [res.episodes];
          
        },
        error: (err: any) => {
          this.loading = false;
          this.episodes = [];
        }
      })
    } else this.getEpisodesBySeasons();
  }
}