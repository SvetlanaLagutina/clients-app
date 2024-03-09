import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { PortalDataDto, PortalClientsApi } from '@shared/api';
import { PortalData } from '../models/portal-data';
import { ClientsAdapter } from './clients.adapter';

@Injectable()
export class ClientsData {
  constructor(private _portalClientsApi: PortalClientsApi) {}

  getList(): Observable<PortalData> {
    return this._portalClientsApi.getList().pipe(map((dto: PortalDataDto) => ClientsAdapter.toClientList(dto)));
  }
}
