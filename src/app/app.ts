import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import GButton from './shared/components/g-button/g-button';
import {GInput} from './shared/components/g-input/g-input';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GButton, GInput,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sud-id');
}
