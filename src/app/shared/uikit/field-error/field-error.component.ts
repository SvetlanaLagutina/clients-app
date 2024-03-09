import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { filter, startWith, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'field-error',
  imports: [CommonModule],
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class FieldErrorComponent implements OnInit {
  @Input({ required: true }) fieldName!: string;
  errors!: string[];
  control!: FormControl;

  constructor(
    private readonly _formRef: FormGroupDirective,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.control = this._formRef.form.controls[this.fieldName] as FormControl;

    if (!this.control) throw new Error(`The control with name ${this.fieldName} doesn't exist`);

    combineLatest([this.control.valueChanges, this.control.statusChanges])
      .pipe(
        startWith(this.control.value),
        filter(() => this.control.dirty),
        tap(() => this.handleErrors(this.control.errors)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe();
  }

  private handleErrors(errors: ValidationErrors | null): void {
    this.errors = [];

    for (const errorKey in errors) {
      const text: string = this.getErrorText(errorKey, errors![errorKey]);
      this.errors.push(text);
    }

    this._cdr.detectChanges();
  }

  private getErrorText(key: string, value: any): string {
    switch (key) {
      case 'email':
        return 'Некорректный адрес';
      case 'minlength':
        return 'Минимальное количество символов: 2';
      case 'maxlength':
        return 'Максимальное количество символов {{value.requiredLength}}, текущее {{value.actualLength}}';
      case 'min':
        return 'Допустимый минимум: {{value.min}}, текущее значение {{value.actual}}';
      case 'max':
        return 'Допустимый максимум: {{value.max}}, текущее значение {{value.actual}}';
      case 'required':
        return 'Необходимо заполнить';

      default:
        if ('text' in value) return value.text, value.interpolateParams;

        if (typeof value === 'string') return value;

        return key;
    }
  }
}
