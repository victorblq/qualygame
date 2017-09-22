import { Component } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './qualygame-view.component.html'
})
export class QualygameViewComponent
{
    constructor(translate: TranslateService) {
        // Esse idioma é usado como 'fallback' caso o idioma selecionado a baixo não seja encontrado
        translate.setDefaultLang('en');

         // Idioma a ser usado
        translate.use('pt-br');
    }
}