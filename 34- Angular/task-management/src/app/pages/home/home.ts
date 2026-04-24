import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Carousel } from '../../components/carousel/carousel';
@Component({
  selector: 'app-home',
  imports: [RouterLink, Carousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  user: User | null = null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }
}
