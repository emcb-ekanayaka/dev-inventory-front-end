import { Component } from '@angular/core';
import { ComWarehouseRepresntation } from '../services/module/comwarehouse-representation';
import { CompanyService } from '../services/company.service';
import { WarehouseService } from '../services/warehouse.service';
import { ComWarehouseServiceService } from '../services/com-warehouse-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comwarehouse',
  standalone: false,

  templateUrl: './comwarehouse.component.html',
  styleUrl: './comwarehouse.component.scss'
})
export class ComwarehouseComponent {

  comWareObj: ComWarehouseRepresntation = {};

  type: any;

  allCompanies: any;
  allWarehouse: any;
  allComWarehoues: any;

  comWarehouseId: any;
  warehouseId: any;

  companyValue: any;
  warehouseValue: any;

  isEditClass: Boolean = false;
  classes: Array<any> = [];
  allCourse: Array<any> = [];

  constructor(
    private companyService: CompanyService,
    private warehouseService: WarehouseService,
    private comWarehouseService: ComWarehouseServiceService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isEditClass == false;
    this.GetAllCompanies();
    this.GetAllWarehouses();
    this.GetAllComWarehoues();
  }

  GetAllComWarehoues() {
    this.comWarehouseService.GetAllComWarehoues().subscribe(allData => {
      this.allComWarehoues = allData.data.dataList;
    })
  }
  GetAllCompanies() {
    this.companyService.GetAllCompanies().subscribe(allData => {
      this.allCompanies = allData.data.dataList;
    })
  }

  GetAllWarehouses() {
    this.warehouseService.GetAllWarehouses().subscribe(allData => {
      this.allWarehouse = allData.data.dataList;
    })
  }

  onChangeCompany(ID: any) {
    this.comWareObj.companyName = ID.target.value;
  }

  onChangeWarehouse(ID: any) {
    this.comWareObj.warehouseName = ID.target.value;
  }

  SaveComWarehouse(): void {
    this.type = this.isEditClass == false ? 'Add' : 'Update';
    if (this.type == 'Add') {
      console.log(this.comWareObj);
      swal({
        title: "Are you sure?",
        text: "Do you want to add these details?",
        icon: "warning",
        dangerMode: true,
      }).then(willAdd => {
        if (willAdd) {
          this.comWarehouseService.createComWarehouse(this.comWareObj, this.type)
            .subscribe({
              next: (result: any): void => {
                console.log(result.code);
                
                if (result.code === 201) {
                  swal("Success!", "Com-Warehouse has been added!", "success");
                  this.GetAllComWarehoues();
                 
                } else if (result.code === 400) {
                  swal("Duplicate!", "Company-Warehouse already exists!", "error");
                  this.GetAllComWarehoues();

                }
              },
              error: (error: any): void => {
                swal("Error!", "Failed to add Com-Warehouse. Please try again.", "error");
              }
            });
        }
      });
    }
    else {
      this.comWarehouseService.createComWarehouse(this.comWareObj, this.type)
        .subscribe({
          next: (result): void => {
            this.GetAllComWarehoues();
            this.isEditClass = false
          }
        });
      swal("Sucessfull!", "Com-Warehouse has been updated!", "success");
    }
  }

  GetComWarehouseById(comwarehouesepanyID: any) {
    this.comWarehouseService.GetComWarehouesById(comwarehouesepanyID).subscribe(allData => {
      const Obj = allData.data.dataList[0];

      // Bind the values for selection
      this.companyValue = Obj.companyId.companyName;
      this.warehouseValue = Obj.warehouseId.warehouseName;

      this.comWareObj.id = Obj.id;
      this.comWareObj.companyName = Obj.companyId.companyName;
      this.comWareObj.warehouseName = Obj.warehouseId.warehouseName;

      // Set isEditClass to true for toggling the submit button
      this.isEditClass = true;
    });
  }

}
