import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { visitProductDto } from '@drivers/interface/visit.interface';

@Component({
  selector: 'app-modal-res-detaill',
  standalone: true,
  imports: [MatTableModule, MatDialogModule, MatCardModule],
  templateUrl: './modal-res-detaill.component.html',
  styleUrl: './modal-res-detaill.component.scss',
})
export class ModalResDetaillComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: visitProductDto[]) {}

  displayedColumns: string[] = ['product', 'quantity', 'price', 'total'];
  total() {
    return this.data.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }
}
