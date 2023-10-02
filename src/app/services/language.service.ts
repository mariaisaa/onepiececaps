import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  //inyectamos el translate
  translate = inject(TranslateService);


  
  setInitialLanguage(){

    let language = this.translate.getBrowserLang();
    let savedLang = localStorage.getItem(`language`);

    this.translate.setDefaultLang(`language`);

    if(savedLang)
    this.setLanguage(savedLang);
  else this.setLanguage(`language`);

  }

  setLanguage( Lang: string){
    this.translate.use(Lang);
    localStorage.setItem('language', Lang);
  }
  

}
