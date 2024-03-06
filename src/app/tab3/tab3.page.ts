import { Component, inject } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  usuarioActivo:User|any;
  editMode: boolean = false;

  constructor( private router: Router) {}
  
  ngOnInit() {
    this.usuarios$.subscribe(data => {
      console.log('User data:', data);
      this.users = data; 
    });
    // this.usuarioActivo = this._userService.currentUser;
    
    // this._userService.currentUser.subscribe((user: User | any) => {
    //   this.usuarioActivo = user;
    // });

    this.usuarioActivo = this._userService.currentUser;

  }
  private _userService = inject(FirebaseService)
  users: any[] = []; // 
  usuarios$ = this._userService.getUsers();

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  async logout() {
    await this._userService.logout();
    this.router.navigate(['/']); // Redirige a la página de inicio de sesión
  }

  async saveChanges() {
    await this._userService.updateUser(this.usuarioActivo.id, this.usuarioActivo);
    this.editMode = false; // Desactiva el modo de edición después de guardar los cambios
  }

  onNombreChange(event: any) {
    this.usuarioActivo.nombre = event.target.value;
  }

  onApellidoChange(event: any) {
    this.usuarioActivo.apellido = event.target.value;
  }

}
