import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteCreateComponent } from "./views/components/cliente/cliente-create/cliente-create.component";
import { ClienteDeleteComponent } from "./views/components/cliente/cliente-delete/cliente-delete.component";
import { ClienteReadComponent } from "./views/components/cliente/cliente-read/cliente-read.component";
import { ClienteUpdateComponent } from "./views/components/cliente/cliente-update/cliente-update.component";
import { HomeComponent } from "./views/components/home/home.component";
import { OsCreateComponent } from "./views/components/ordemServico/os-create/os-create.component";
import { OsDeleteComponent } from "./views/components/ordemServico/os-delete/os-delete.component";
import { OsReadComponent } from "./views/components/ordemServico/os-read/os-read.component";
import { OsUpdateComponent } from "./views/components/ordemServico/os-update/os-update.component";
import { OsViewComponent } from "./views/components/ordemServico/os-view/os-view.component";
import { OsClosedComponent } from "./views/components/os-closed/os-closed.component";
import { TecnicoCreateComponent } from "./views/components/tecnico/tecnico-create/tecnico-create.component";
import { TecnicoDeleteComponent } from "./views/components/tecnico/tecnico-delete/tecnico-delete.component";
import { TecnicoReadComponent } from "./views/components/tecnico/tecnico-read/tecnico-read.component";
import { TecnicoUpdateComponent } from "./views/components/tecnico/tecnico-update/tecnico-update.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path:"tecnicos",
    component: TecnicoReadComponent
  },
  {
    path:"tecnicos/create",
    component: TecnicoCreateComponent
  },
  {
    path:"tecnicos/update/:id",
    component:TecnicoUpdateComponent
  },
  {
    path:"tecnicos/delete/:id",
    component:TecnicoDeleteComponent
  },
  {
    path:"clientes",
    component:ClienteReadComponent
  },
  {
    path:"clientes/create",
    component:ClienteCreateComponent
  },
  {
    path:"clientes/update/:id",
    component:ClienteUpdateComponent
  },
  {
    path:"clientes/delete/:id",
    component:ClienteDeleteComponent
  },
  {
    path:"os",
    component:OsReadComponent
  },
  {
    path:"os/create",
    component:OsCreateComponent
  },
  {
    path:"os/update/:id",
    component:OsUpdateComponent
  },
  {
    path:"os/delete/:id",
    component:OsDeleteComponent
  },
  {
    path:"os/view/:id",
    component:OsViewComponent
  },
  {
    path:"os/closed",
    component:OsClosedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
