import { Component } from '@angular/core';
import swal from 'sweetalert';
import { FormBuilder } from '@angular/forms';
import { CompanyService } from '../services/company.service';
import { CompanyRepresentation } from '../services/module/compnay-representation';

@Component({
  selector: 'app-company',
  standalone: false,

  templateUrl: './company.component.html',
  styleUrl: './company.component.scss'
})
export class CompanyComponent {

  companyObj: CompanyRepresentation = {};
  companies: Array<any> = [];
  allStatus: any;

  type: any;
  statusValue: any;
  isEditStudent: boolean = false;
  dtDynamicVerticalScrollExample: any;

  constructor(
    private companyService: CompanyService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isEditStudent == false;
    this.GetAllCompanies();
  }


  SaveCompany(): void {

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
            this.companyService.createCompany(this.companyObj, this.type)
              .subscribe({
                next: (result): void => {
                  this.GetAllCompanies();  
                }
              });
            swal("Sucessfull!", "Company has been Adedd!", "success");
            this.ResetForm();
          }

        });
    }else{
      this.companyService.createCompany(this.companyObj,this.type)
          .subscribe({
            next:(result):void=>{
              this.GetAllCompanies();  
            }
          });
      swal("Sucessfull!", "Company has been updated!", "success");
      this.ResetForm();
    }
  }
  ResetForm(): void {
    this.companyObj = {
      companyName: '',
      comAddressOne: '',
      comAddressTwo: '',
      comAddressThree: '',
      brNumber: '',
    };
  }

  GetAllCompanies() {
    this.companyService.GetAllCompanies().subscribe(allData => {
      this.companies = allData.data.dataList;
    })
  }

  GetCompanyById(ID:any){
    this.companyService.GetCompanyById(ID).subscribe(allData=>{ 
    this.companyObj = allData.data.dataList[0];
    this.isEditStudent = true;
  })
  }

}
