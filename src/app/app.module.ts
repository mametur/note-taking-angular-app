import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { notesReducer } from './notes/state/notes.reducer';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ notes: notesReducer }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
