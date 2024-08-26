import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModelGasolineService } from '@drivers/services/model-gasoline.service';
import { catalogueInterface, formModalDto } from '@utils/commons.interface';
import { FormCmsComponent } from '@utils/components/form-cms/form-cms.component';
import { OnlyNumberInputDirective } from '@utils/directivas/only-number-input.directive';
import { CatalogueService } from '@utils/modules/catalogues/services/catalogue.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-model-gasoline-form',
  standalone: true,
  imports: [
    FormCmsComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    OnlyNumberInputDirective,
    MatInputModule,
  ],
  templateUrl: './model-gasoline-form.component.html',
  styleUrl: './model-gasoline-form.component.scss',
})
export class ModelGasolineFormComponent implements OnInit {
  public dataInfo!: formModalDto;
  public form!: FormGroup;
  public gasolineTypes: catalogueInterface[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: catalogueInterface,
    private catalogueSvc: CatalogueService,
    private fb: FormBuilder,
    private modelGasolineSvc: ModelGasolineService,
    private cataloguesSvc: CatalogueService,
    private matDialog: MatDialogRef<ModelGasolineFormComponent>
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      gasolineTypeId: ['', Validators.required],
      gasolineLtsKm: ['', [Validators.required, Validators.min(0.1)]],
    });
    let obs: Observable<any>;
    if (this.data.id === undefined) {
      obs = this.catalogueSvc.create(this.data, 'MODELDV');
    } else {
      obs = this.cataloguesSvc.update(
        this.data.id as number,
        'MODELDV',
        this.data
      );
    }
    obs.subscribe((resCatalogue: catalogueInterface) => {
      let ID_FINAL =
        this.data.id !== undefined ? this.data.id : resCatalogue.id;
      this.modelGasolineSvc
        .get({
          pageNumber: 1,
          pageSize: 10,
          query: { id: ID_FINAL as number },
        })
        .subscribe((res) => {
          let message = 'Se ha creado el modelo de la marca con exito';
          if (this.data.id !== undefined)
            message = 'Se ha actualizado el modelo de la marca con exito';
          Swal.fire({
            title: message,
            icon: 'success',
          });
          let resData = undefined;

          if (res.items.length > 0) resData = res.items[0];
          console.log(resData);
          this.catalogueSvc
            .get('TGV', 1, 10, { all: true })
            .subscribe((res) => {
              this.gasolineTypes = res.items;
              this.dataInfo = {
                title: 'Información de la gasolina',
                form: this.form,
                data: resData,
                dialogRef: this.matDialog,
                post: this.modelGasolineSvc.post.bind(this.modelGasolineSvc),
                put: this.modelGasolineSvc.put.bind(this.modelGasolineSvc),
                map: (data: any) => {
                  return {
                    ...data,
                    modelId: ID_FINAL,
                  };
                },
                // data
              };
            });
        });
    });
  }
}
