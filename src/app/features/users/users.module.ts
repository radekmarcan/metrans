import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { UsersService } from './service/users.service';
import { UsersComponent } from './container/users.component';
import { UserDialogComponent } from './components/user-dialog/user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: UsersComponent }];

@NgModule({
    declarations: [UsersComponent, UserDialogComponent],
    imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MatDialogModule, FormsModule, ReactiveFormsModule],
    providers: [UsersService],
})
export class UsersModule {}
