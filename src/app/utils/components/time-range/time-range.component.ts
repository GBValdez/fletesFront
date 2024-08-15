import { Component, Optional, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimeRangeInterface } from './time-range.interface';

@Component({
  selector: 'app-time-range',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './time-range.component.html',
  styleUrl: './time-range.component.scss',
})
export class TimeRangeComponent implements ControlValueAccessor {
  constructor(
    @Optional() @Self() private ngControl: NgControl,
    private fb: FormBuilder
  ) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  rangeForm(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const values = formGroup.value;
      if (values.init === '' || values.end === '') return null;
      if (values.init <= values.end) return null;
      return {
        rangeInvalid: 'La hora de inicio debe ser menor a la hora de fin',
      };
    };
  }

  form!: FormGroup;
  onTouch?: Function;
  onWrite?: Function;
  writeValue(obj: TimeRangeInterface): void {
    if (obj) {
      this.form.patchValue(obj);
    } else {
      this.form.patchValue({ init: '', end: '' });
    }
  }
  registerOnChange(fn: any): void {
    this.onWrite = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        init: ['', [Validators.required]],
        end: ['', [Validators.required]],
      },
      {
        validators: this.rangeForm(),
      }
    );

    if (this.ngControl?.control)
      this.form.setValidators(this.ngControl.control.validator!);
    this.form.updateValueAndValidity();

    this.form.valueChanges.subscribe((value) => {
      this.onTouch?.();
      if (value.init === '' || value.end === '') {
        this.onWrite?.(null);
        return;
      }
      this.onWrite?.(value);
    });
  }
}
