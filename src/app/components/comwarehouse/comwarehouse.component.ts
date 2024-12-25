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
  allComWarehoues:any;

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

  GetAllComWarehoues(){
    this.comWarehouseService.GetAllComWarehoues().subscribe(allData => {
      this.allComWarehoues = allData.data.dataList;
      console.log(this.allComWarehoues);
      
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
        text: "That you want to Add this details?",
        icon: "warning",
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
            this.comWarehouseService.createComWarehouse(this.comWareObj, this.type)
              .subscribe({
                next: (result): void => {
                  //this.GetAllStudents();  
                }
              });
            swal("Sucessfull!", "Com-Warehouse has been Adedd!", "success");
          }

        });
    }
    else {
      this.comWarehouseService.createComWarehouse(this.comWareObj, this.type)
        .subscribe({
          next: (result): void => {
            //this.GetAllStudents();  
          }
        });
      swal("Sucessfull!", "Com-Warehouse has been updated!", "success");
    }
  }


}
