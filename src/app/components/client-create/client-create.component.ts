import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PortalClientCreate } from '../../models/portal-client-create';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldErrorComponent } from '@shared/uikit';
import { MessageService } from 'primeng/api';
import { PortalClientsApi } from '@shared/api';

@Component({
  selector: 'client-create',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FieldErrorComponent,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    ReactiveFormsModule,
  ],
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss'],
})
export class ClientCreateComponent {
  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>(''),
  });

  constructor(
    private _portalClientsApi: PortalClientsApi,
    private _dialogRef: DynamicDialogRef,
    public _messageService: MessageService,
  ) {}

  cancel(): void {
    this._dialogRef.close();
  }

  submit(): void {
    this._portalClientsApi.create(this.form.value as PortalClientCreate);
    console.log('Новый клиент:', this.form.value);
    this._dialogRef.close();
  }
}
