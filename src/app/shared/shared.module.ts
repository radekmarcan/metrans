import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { RemoveDialogComponent } from './components/remove-dialog/remove-dialog.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
    declarations: [TableComponent, RemoveDialogComponent],
    imports: [CommonModule, MatDialogModule],
    exports: [TableComponent],
})
export class SharedModule {}
