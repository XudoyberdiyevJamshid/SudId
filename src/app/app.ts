import { Component, DOCUMENT, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('sud-id');
  private document = inject(DOCUMENT);
  ngAfterViewInit(): void {
    const preloader = this.document.getElementById('fuse-splash-screen');

    if (preloader) {
      preloader.classList.add('fuse-splash-screen-hidden');

      setTimeout(() => {
        preloader.remove();
      }, 500);
    }
  }
}
