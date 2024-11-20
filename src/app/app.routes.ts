import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNoteComponent } from './notes/components/add-note/add-note.component';
import { ListNotesComponent } from './notes/components/list-notes/list-notes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },
  { path: 'add', component: AddNoteComponent },
  { path: 'list', component: ListNotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}