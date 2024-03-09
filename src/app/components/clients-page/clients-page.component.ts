import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PortalClients } from '../../models/portal-clients';
import { PortalClientEdit } from '../../models/portal-client-edit';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { Message } from 'primeng/api';
import { ClientsData } from '../../data/clients.data';
import { ClientsMediator } from '../../services/clients.mediator';

@Component({
  selector: 'clients-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, ConfirmDialogModule, MessagesModule, TableModule, TooltipModule],
  templateUrl: './clients-page.component.html',
  styleUrls: ['./clients-page.component.scss'],
  providers: [ClientsData, ClientsMediator, ConfirmationService, DialogService],
})
export class ClientsPageComponent {
  clientsList$: Observable<PortalClients[]> = this._mediator.clientsList$;
  selectedClients: PortalClients[] = [];
  msgs: Message[] = [];

  constructor(
    private _mediator: ClientsMediator,
    private _dialog: DialogService,
    private _confirmmation: ConfirmationService,
  ) {}

  ngOnInit(): void {
    this._mediator.init();
  }

  selectionChange(clients: PortalClients[]): void {
    this.selectedClients = clients;
    console.log('this.selectedClients.length', this.selectedClients.length);
  }

  showCreateModal(): void {
    this._dialog.open(ClientCreateComponent, {
      width: '25%',
      position: 'center',
      header: 'Новый клиент',
      data: {},
    });
  }

  showEditModal(clientEdit: PortalClientEdit): void {
    this._dialog.open(ClientEditComponent, {
      width: '25%',
      position: 'center',
      header: 'Редактирование',
      data: { clientEdit },
    });
  }

  showDeleteConfirm(): void {
    this._confirmmation.confirm({
      header: 'Удаление строк',
      message: `Удалить выбранные строки (${this.selectedClients.length})?`,
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptButtonStyleClass: 'p-button-danger p-button-outlined',
      accept: () => {
        this.msgs = [
          {
            severity: 'success',
            summary: 'Удаление!',
            detail: 'Клиенты были удалены',
          },
        ];
      },
    });
  }
}
