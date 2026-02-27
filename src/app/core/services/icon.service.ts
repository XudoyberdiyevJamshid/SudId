import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, shareReplay } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  private iconCache = new Map<string, Observable<SafeHtml | null>>();

  getIcon(name: string): Observable<SafeHtml | null> {
    if (this.iconCache.has(name)) {
      return this.iconCache.get(name)!;
    }

    const path = `assets/icons/${name}.svg`;

    const request$ = this.http.get(path, { responseType: 'text' }).pipe(
      map((svgString) => {
        return this.sanitizer.bypassSecurityTrustHtml(svgString);
      }),
      catchError((err) => {
        console.warn(`Icon '${name}' not found in assets.`);
        return of(null);
      }),
      shareReplay(1),
    );

    this.iconCache.set(name, request$);

    return request$;
  }
}
