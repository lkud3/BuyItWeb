import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from "./registration/registration.component";
import { MainComponent } from "./main/main.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RegistrationComponent, MainComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  show:string = 'login';

  redirect() {
    this.show="main"
    }
}
