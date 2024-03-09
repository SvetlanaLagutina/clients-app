import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPageComponent } from './components/clients-page/clients-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsPageComponent,
    data: { title: 'INITIUM APP' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
