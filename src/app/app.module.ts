import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { ClientEditComponent } from './components/client-edit/client-edit.component';
import { ClientsPageComponent } from './components/clients-page/clients-page.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ClientCreateComponent,
    ClientEditComponent,
    ClientsPageComponent,
    BrowserModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    MessagesModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ConfirmationService, DialogService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
