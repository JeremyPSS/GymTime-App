import { Component, OnInit, inject } from '@angular/core';
import { DbClasesService } from 'src/app/services/db-clases.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classpage',
  templateUrl: './classpage.page.html',
  styleUrls: ['./classpage.page.scss'],
})
export class ClasspagePage implements OnInit {

  selectedCategory: string | undefined
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedCategory = params['category']; // obtén el parámetro de la URL
      this.clases$.subscribe(data => {
        this.listClasses = data.filter(clase => clase.categoria === this.selectedCategory);
        console.log(this.listClasses);
      });
    });
  }

  private _claseService = inject(DbClasesService)
  listClasses: any[] = [];

  clases$ = this._claseService.getClases();


}
