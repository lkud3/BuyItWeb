import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, LoginComponent, RegComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  @Output() loginsuccessful = new EventEmitter<void>(); 

  showLogin:boolean = true;

  loginSuccessfull(){
    this.loginsuccessful.emit();
  }

  toggleView() {
    this.showLogin = !this.showLogin;
  }
}
