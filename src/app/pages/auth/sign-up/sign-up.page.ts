import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/Models/User';
import { first } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor() { }

  ngOnInit() {
    // Subscribe to the Observable to get the user data
    this.contacts$.subscribe(data => {
      console.log('User data:', data);
      this.users = data; // Store fetched users in the users array
    });
  }

  private _userService = inject(FirebaseService)
  users: any[] = []; // Array to store users fetched from Firestore
  contacts$ = this._userService.getUsers();

  submit(){
    if (this.form.valid) {
      console.log("Form values:",this.form.value);

      const name = this.form.get('first_name')?.value ?? '';
      const surname = this.form.get('last_name')?.value ?? '';
      const correo = this.form.get('email')?.value ?? '';
      const contrasenia = this.form.get('password')?.value ?? '';

      const newUser: User = {
        nombre: name,
        apellido: surname,
        email: correo,
        password: contrasenia
      };
      this._userService.createUser(newUser)
        .then(() => {
          console.log('User created successfully!');
        })
        .catch(error => {
          console.error('Error creating user:', error);
        });
    }
  }


}
