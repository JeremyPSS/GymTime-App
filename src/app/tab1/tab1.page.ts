import { Component, OnInit, inject } from '@angular/core';

// Import the CloudinaryModule.
import {CloudinaryModule} from '@cloudinary/ng';

// Import the Cloudinary classes.
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';

import {fill} from "@cloudinary/url-gen/actions/resize";
import { DbCoachService } from '../services/db-coach.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  img!: CloudinaryImage;
  src: string = 'docs/models';

  segmentoSeleccionado: string = 'programas'; // Inicializamos el segmento seleccionado en 'programas'

  constructor() {}
  ngOnInit(): void {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'dszxaghes'
      }
    });
    this.img = cld.image('docs/models');
    this.img.resize(fill().width(250).height(250));
    this.src = this.img.resize(fill().width(250).height(250)).toURL();
    
    this.coaches$.subscribe(data => {
      console.log('User data:', data);
      this.listCoaches = data; 
    });
  }

  private _coachService = inject(DbCoachService)
  listCoaches: any[] = [];
  coaches$ = this._coachService.getCoaches();


}
