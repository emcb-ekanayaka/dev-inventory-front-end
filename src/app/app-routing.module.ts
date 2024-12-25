import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ComwarehouseComponent } from './components/comwarehouse/comwarehouse.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path : '',component : DashboardComponent},
  {path : 'company',component : CompanyComponent},
  {path : 'warehouse',component : WarehouseComponent},
  {path : 'comwarehouse',component : ComwarehouseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
