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
  allComWarehoues:  Array<any> = [];

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

  
  filtereComdWarehoues = [...this.allComWarehoues]; // Start with all companies
  searchTerm: string = '';

  filterCompanies(): void {
    const term = this.searchTerm.trim().toLowerCase();
  
    if (!term) {
      // Reset to the full list if the search term is empty
      this.filtereComdWarehoues = [...this.allComWarehoues];
    } else {
      this.filtereComdWarehoues = this.allComWarehoues.filter((company) => {
        // Flatten the company object to include nested properties
        const flatCompany = {
          ...company,
          companyId: JSON.stringify(company.companyId), // Convert nested object to a searchable string
          warehouseId: JSON.stringify(company.warehouseId),
        };
  
        // Search across all flattened values
        return Object.values(flatCompany).some((value) => {
          return value != null && value.toString().toLowerCase().includes(term);
        });
      });
    }
  }
  

  GetAllComWarehoues() {
    this.comWarehouseService.GetAllComWarehoues().subscribe(allData => {
      this.allComWarehoues = allData.data.dataList;
      console.log(this.allComWarehoues);
      
      this.filtereComdWarehoues = [...this.allComWarehoues]; 
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

  DeleteById(objId: any) {
    this.comWarehouseService.GetComWarehouesById(objId).subscribe(allData => {
      this.comWarehouseId = allData.data.dataList[0].id;
      swal({
        title: "Are you sure? To Delete",
        icon: "warning",
        dangerMode: true,
      })
        .then(willDelete => {
          if (willDelete) {
            this.comWarehouseService.DeleteComWarehouseById(this.comWarehouseId)
              .subscribe({
                next: (allData): void => {
                  this.GetAllComWarehoues();
                }
              });
            
            swal("Sucessfull!", "Com Warehouese has been Deleted!", "success");
          }

        });

    })
  }

}
