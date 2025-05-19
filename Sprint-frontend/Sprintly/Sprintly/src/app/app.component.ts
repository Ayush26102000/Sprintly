import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/Loader/loader.service';
import { Observable } from 'rxjs';
import { LoaderComponent } from "./services/Loader/loader/loader.component";
import { AsyncPipe,CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet, LoaderComponent,AsyncPipe,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sprintly';

  isLoading: Observable<boolean>;

  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading;
  }
}
