import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { NotificationComponent } from './components/notification/notification';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, NotificationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(public notificationService: NotificationService) {}
}
