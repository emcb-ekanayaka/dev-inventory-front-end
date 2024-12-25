import { Component } from '@angular/core';
import { WarehouseRepresentation } from '../services/module/warehouse-representation';
import { WarehouseService } from '../services/warehouse.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  standalone: false,
  
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.scss'
})
export class WarehouseComponent {
  
  WarehouseObj: WarehouseRepresentation = {};
  warehouses: Array<any> = [];
  allStatus: any;

  type: any;
  statusValue: any;
  isEditStudent: boolean = false;
  dtDynamicVerticalScrollExample: any;

  constructor(
    private warehouseService: WarehouseService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isEditStudent == false;
    this.GetAllWarehouse();
  }


  SaveWarehouse(): void {

    this.type = this.isEditStudent == false ? 'Add' : 'Update';
    if (this.type == 'Add') {
      swal({
        title: "Are you sure?",
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
            this.warehouseService.createWarehouse(this.WarehouseObj, this.type)
              .subscribe({
                next: (result): void => {
                  this.GetAllWarehouse();
                }
              });
            swal("Sucessfull!", "Warehouse has been Adedd!", "success");
            this.ResetForm();
          }

        });
    } else {
      this.warehouseService.createWarehouse(this.WarehouseObj, this.type)
        .subscribe({
          next: (result): void => {
            this.GetAllWarehouse();
          }
        });
      swal("Sucessfull!", "Warehouse has been updated!", "success");
      this.ResetForm();
    }
  }
  ResetForm(): void {
    this.WarehouseObj = {
      warehouseName: '',
      warehouseLocation: '',

    };
  }

  filteredWarehoues = [...this.warehouses]; // Start with all companies
  searchTerm: string = '';

  filterCompanies(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      // Reset to the full list if the search term is empty
      this.filteredWarehoues = [...this.warehouses];
    } else {
      this.filteredWarehoues = this.warehouses.filter((warehouse) =>
        Object.values(warehouse).some((value) => {
          // Ensure value is not null/undefined and safely convert to a string for comparison
          return value != null && value.toString().toLowerCase().includes(term);
        })
      );
    }
  }

  GetAllWarehouse() {
    this.warehouseService.GetAllWarehouses().subscribe(allData => {
      this.warehouses = allData.data.dataList;
      this.filteredWarehoues = [...this.warehouses];
    })
  }
  GetWarehouseById(ID: any) {
    this.warehouseService.GetWarehouseById(ID).subscribe(allData => {
      this.WarehouseObj = allData.data.dataList[0];
      this.isEditStudent = true;
    })
  }

  DeleteById(ID: any) {
    swal({
      title: "Are you sure",
      text: "That you want to Delete this Warehouse?",
      icon: "warning",
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          swal("Deleted!", "Warehouse has been deleted!", "success");
          this.warehouseService.DeleteWarehouseById(ID).subscribe(allData => {
            this.GetAllWarehouse();
          })
        }
      });

  }


}
