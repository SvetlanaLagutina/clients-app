import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PortalDataDto, PortalClientCreateDto, PortalClientEditDto } from '@shared/api';

@Injectable({ providedIn: 'root' })
export class PortalClientsApi {
  constructor(private _http: HttpClient) {}
  configUrl: string = 'https://test-data.directorix.cloud/task1';

  getList(): Observable<PortalDataDto> {
    return this._http.get<PortalDataDto>(this.configUrl);
  }

  create(model: PortalClientCreateDto): Observable<PortalClientCreateDto> {
    return this._http.post<PortalClientCreateDto>(this.configUrl, model);
  }

  edit(model: PortalClientEditDto): Observable<PortalClientEditDto> {
    return this._http.post<PortalClientEditDto>(this.configUrl, model);
  }
}
