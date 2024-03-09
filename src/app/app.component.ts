import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _titleService: Title
  ) {}

  ngOnInit() {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap(() => {
          this._titleService.setTitle(this._getRouteTitles().join(' | '));
        })
      )
      .subscribe();
  }

  private _getRouteTitles(): string[] {
    let currentRoute: ActivatedRoute | null =
      this._router.routerState.root.firstChild;
    const titles: string[] = [];

    while (currentRoute) {
      if (currentRoute.snapshot.routeConfig?.data?.['title']) {
        titles.push(currentRoute.snapshot.routeConfig.data?.['title']);
      }

      currentRoute = currentRoute.firstChild;
    }

    return titles;
  }
}
