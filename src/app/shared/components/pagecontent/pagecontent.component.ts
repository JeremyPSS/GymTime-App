import { Component, Input, OnInit, inject } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DbReservaService } from 'src/app/services/db-reserva.service';
import { Reserva } from 'src/app/Models/Reserva';
// import { CustomEvent, OverlayEventDetail } from '@ionic/core';


@Component({
  selector: 'app-pagecontent',
  templateUrl: './pagecontent.component.html',
  styleUrls: ['./pagecontent.component.scss'],
})
export class PagecontentComponent  implements OnInit {

  @Input() instructor!: string;
  @Input() hora!: string;
  @Input() tituloclase!: string;
  @Input() fecha!: string;
  @Input() duracion!: string;

  constructor(private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    this.reservas$.subscribe(data => {
      console.log('User data:', data);
      this.listReservas = data; 
    });
  }

  private _reservaService = inject(DbReservaService)
  listReservas: any[] = [];
  reservas$ = this._reservaService.getReservas();
  // newAsign:any = Reserva;

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmar reservar',
      subHeader: '¿Desea hacer la reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Reserva canceleda');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            console.log('Reserva confirmada');
            const reservaData = {
              instructor: this.instructor,
              hora: this.hora,
              clase: this.tituloclase,
              fecha: this.fecha,
              duracion: this.duracion,
              codigo: Math.floor(Math.random() * 9999) + 1
            };
            this.guardarReserva(reservaData);
            this.presentToast('bottom');
          },
        },
      ]
    });

    await alert.present();
  }

  guardarReserva(reservaData: any) {
    // Llama al método del servicio para guardar la reserva
    this._reservaService.createReserva(reservaData).then(() => {
      console.log('Reserva guardada exitosamente');
    }).catch(error => {
      console.error('Error al guardar la reserva', error);
    });
  }

  // public alertButtons = [
  //   {
  //     text: 'Cancel',
  //     role: 'cancel',
  //     handler: () => {
  //       console.log('Alert canceled');
  //     },
  //   },
  //   {
  //     text: 'OK',
  //     role: 'confirm',
  //     handler: () => {
  //       console.log('Alert confirmed');
  //     },
  //   },
  // ];

  // setResult(ev: { detail: { role: any; }; }) {
  //   console.log(`Dismissed with role: ${ev.detail.role}`);
  // }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Clase reservada',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
