import { Component, inject } from '@angular/core';
import { Clases } from '../Models/Clases';
import { DbClasesService } from '../services/db-clases.service';
import { DbReservaService } from '../services/db-reserva.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private toastController: ToastController) {}

  ngOnInit(): void {
    this.reservas$.subscribe(data => {
      console.log('User data:', data);
      this.listReservas = data; 
    });
  }

  private _reservaService = inject(DbReservaService)
  listReservas: any[] = [];
  reservas$ = this._reservaService.getReservas();

  eliminarReserva(id: string) {
    this._reservaService.deleteReserva(id).then(() => {
      this.listReservas = this.listReservas.filter(reserva => reserva.id !== id);
      this.presentToast('bottom');
    }).catch(error => {
      console.error('Error al eliminar la reserva', error);
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Reserva eliminada',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
