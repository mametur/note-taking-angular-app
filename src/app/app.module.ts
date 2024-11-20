import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from './notes/state/notes.reducer';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ notes: notesReducer }),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
