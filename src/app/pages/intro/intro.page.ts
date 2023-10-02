import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})

export class IntroPage implements OnInit {

  //inyectamos el router
  router = inject (Router)

  ngOnInit() {

  }

//se enruta al home
ionViewWillEnter(){
  setTimeout(() => {
    this.router.navigateByUrl('/home');
    }, 2800);
  }
}
