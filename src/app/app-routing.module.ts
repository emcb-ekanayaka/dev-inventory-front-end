import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';

const routes: Routes = [

  {path : 'company',component : CompanyComponent},
  {path : 'warehouse',component : WarehouseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
