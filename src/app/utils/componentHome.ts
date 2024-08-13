// import { MatDialog } from '@angular/material/dialog';
// import { CommonsSvcService } from './commons-svc.service';
// import { PageEvent } from '@angular/material/paginator';
// import Swal from 'sweetalert2';
// import { Injectable } from '@angular/core';

// @Injectable()
// export class homeCommons<
//   dto,
//   dtoCreation,
//   svcClass extends CommonsSvcService<dto, dtoCreation>,
//   formComponent
// > {
//   constructor(private dataSvc: svcClass, private dialog: MatDialog) {}
//   data: dto[] = [];
//   pageNumber: number = 0;
//   pageSize: number = 10;
//   dataSize: number = 0;

//   ngOnInit(): void {
//     this.getData(this.pageNumber, this.pageSize);
//   }

//   getData(pageNumber: number, pageSize: number) {
//     this.dataSvc
//       .get({
//         pageNumber: pageNumber + 1,
//         pageSize,
//       })
//       .subscribe((res) => {
//         if (res.total > 0) {
//           this.data = res.items;
//           this.dataSize = res.total;
//         } else {
//           this.data = [];
//           this.dataSize = 0;
//           Swal.fire('No se encontraron registros', '', 'info');
//         }
//       });
//   }

//   changePagination(event: PageEvent) {
//     this.pageNumber = event.pageIndex;
//     this.pageSize = event.pageSize;
//     this.getData(this.pageNumber, this.pageSize);
//   }
//   async deleteItem(catalogue: dto) {
//     const result = await Swal.fire({
//       title: '¿Estas seguro de eliminar este registro?',
//       icon: 'warning',
//       showCancelButton: true,
//     });
//     if (result.isConfirmed) {
//       this.dataSvc.delete(catalogue.id!).subscribe(async () => {
//         await Swal.fire('Eliminado', 'Registro eliminado', 'success');
//         this.pageNumber = 0;
//         this.getData(this.pageNumber, this.pageSize);
//       });
//     }
//   }

//   openForm(item?: dto) {
//     this.dialog
//       .open(formComponent, {
//         width: '60%',
//         minWidth: '280px',
//         data: item,
//       })
//       .afterClosed()
//       .subscribe((res) => {
//         if (res?.modify) {
//           this.getData(this.pageNumber, this.pageSize);
//         }
//       });
//   }
// }
