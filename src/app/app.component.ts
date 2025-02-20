import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LifeStylesComponent } from "./components/life-styles/life-styles.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [ LifeStylesComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'safe-bites';
}
