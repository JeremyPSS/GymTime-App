import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SharedModule]
})
export class AuthPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Subscribe to the Observable to get the user data
    this.contacts$.subscribe(data => {
      console.log('User data:', data);
      this.users = data; // Store fetched users in the users array
    });
  }
  
  private _userService = inject(FirebaseService)
  users: any[] = []; // Array to store users fetched from Firestore

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  
  contacts$ = this._userService.getUsers();

  submit(){
    const { email, password } = this.form.value;
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log('Login successful!');
      // this.router.navigate(['/tabs/tab1']);
      this.router.navigate(['/tabs/tab1']);
      this._userService.login(user);

    } else {
      console.log('Invalid email or password. Please try again.');
    }
    console.log(this.users);
  }


}
