import { DomdialogComponent } from './components/domdialog/domdialog.component';
import { DomtableComponent } from './components/domtable/domtable.component';
import { personDialog } from './components/persondialog/persondialog.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { personTable } from './components/persontable/persontable.component';

import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    personTable,
    personDialog,
    DomtableComponent,
    DomdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [personDialog, DomdialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }