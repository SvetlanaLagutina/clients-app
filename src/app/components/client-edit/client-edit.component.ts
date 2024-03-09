import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PortalClientEdit } from '../../models/portal-client-edit';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldErrorComponent } from '@shared/uikit';
import { PortalClientsApi } from '@shared/api';

@Component({
  selector: 'client-edit',
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
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
})
export class ClientEditComponent implements OnInit {
  clientEdit!: PortalClientEdit;

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>(''),
  });

  constructor(
    private _portalClientsApi: PortalClientsApi,
    private _dialogRef: DynamicDialogRef,
    private _dialogConfig: DynamicDialogConfig,
  ) {}

  ngOnInit(): void {
    this.clientEdit = this._dialogConfig.data.clientEdit;
    if (this.clientEdit) {
      this.form.patchValue({
        name: this.clientEdit.name,
        surname: this.clientEdit.surname,
        email: this.clientEdit.email,
        phone: this.clientEdit.phone,
      });
    }
  }

  cancel(): void {
    this._dialogRef.close();
  }

  submit(): void {
    this._portalClientsApi.edit(this.form.value as PortalClientEdit);
    console.log('Редактирование прошло успешно:', this.form.value);
    this._dialogRef.close();
  }
}
