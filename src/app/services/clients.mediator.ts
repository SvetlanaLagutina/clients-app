import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, tap } from 'rxjs';
import { ClientsData } from '../data/clients.data';
import { Message } from 'primeng/api';
import { PortalClients } from '../models/portal-clients';

@Injectable()
export class ClientsMediator {
  private _clientsList$ = new BehaviorSubject<PortalClients[] | null>(null);
  msgs: Message[] = [];

  clientsList$: Observable<PortalClients[]> = this._clientsList$.pipe(
    filter(value => !!value),
    map(value => value as PortalClients[]),
  );

  constructor(private _data: ClientsData) {}

  init(): void {
    this._fetch();
  }

  private _fetch(): void {
    this._data
      .getList()
      .pipe(
        tap({
          next: list => this._clientsList$.next(list.users),
          error: () =>
            (this.msgs = [
              {
                severity: 'error',
                summary: 'Ошибка!',
                detail: 'Неизвестная ошибка',
              },
            ]),
        }),
      )
      .subscribe();
  }
}
