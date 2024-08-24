import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  stationDto,
  stationDtoCreate,
} from '@station/interface/station.interface';
import { StationService } from '@station/services/station.service';
import { formModalDto, infoModalDto } from '@utils/commons.interface';
import { FormCmsComponent } from '@utils/components/form-cms/form-cms.component';
import { TimeRangeComponent } from '@utils/components/time-range/time-range.component';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-station-form',
  standalone: true,
  imports: [
    FormCmsComponent,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    OnlyNumberInputDirective,
    TimeRangeComponent,
    MatButtonModule,
  ],
  templateUrl: './station-form.component.html',
  styleUrl: './station-form.component.scss',
})
export class StationFormComponent implements OnInit {
  public dataInfo!: formModalDto;
  canDelete: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: infoModalDto<stationDto>,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<StationFormComponent>,
    private svc: StationService
  ) {}
  async deleteStation() {
    const alert = await Swal.fire({
      title: '¿Estás seguro de eliminar esta estación?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
    if (!alert.isConfirmed) return;
    this.svc.delete(this.data.data.id).subscribe(async (res) => {
      await Swal.fire('Estación eliminada', '', 'success');
      this.matDialog.close({ modify: true });
    });
  }

  ngOnInit(): void {
    // alert('ProviderFormComponent');
    // console.log(this.data.routerAct.snapshot.params['id']);
    this.canDelete = this.data.data.id != -1;
    this.dataInfo = {
      title: 'Estación',
      form: this.fb.group({
        time: ['', [Validators.required]],
        tel: ['', [Validators.required, Validators.maxLength(8)]],
        email: ['', [Validators.required, Validators.email]],
      }),
      data: this.canDelete ? this.data.data : null,
      dialogRef: this.matDialog,
      post: this.svc.post.bind(this.svc),
      put: this.svc.put.bind(this.svc),
      map: (data: any): stationDtoCreate => {
        const { init, end } = data.time;
        let dataEnd: stationDtoCreate = {
          ...data,
          openingTime: init,
          closingTime: end,
          cord: this.data.data.cord,
          providerId: this.data.routerAct.snapshot.params['id'],
        };
        return dataEnd;
      },
      mapEdit: (data: any) => {
        return {
          ...data,
          time: {
            init: data.openingTime,
            end: data.closingTime,
          },
        };
      },
    };
  }
}
