import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { take } from 'rxjs/operators';
import { RemoveDialogComponent } from 'src/app/shared/components/remove-dialog/remove-dialog.component';
import { RemoveDialogModel } from 'src/app/shared/model/dialog-model';

import { TableItem, TableRowAction } from '@shared/model/tableItem';
import { User, UserDialogModel } from '../model/user';
import { UsersService } from '../service/users.service';
import { UserDialogComponent } from 'src/app/features/users/components/user-dialog/user-dialog.component';
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'me-users',
    template: `
        <div class="flex w-100 mt-4 justify-center">
            <div class="flex-col">
                <div class="flex justify-end mb-2 text-me-blue">
                    <button
                        class="p-2 border border-me-blue rounded hover:bg-me-blue hover:bg-opacity-10 cursor-pointer"
                        (click)="newUser()">
                        Add User
                    </button>
                </div>
                <me-table [headings]="tableHeadings" [tableItems]="users" (rowEvent)="tableAction($event)"></me-table>
            </div>
        </div>
    `,
})
export class UsersComponent {
    readonly tableHeadings: TableItem[] = [
        { name: 'name', text: 'Name' },
        { name: 'email', text: 'Email' },
        { name: 'website', text: 'Website' },
        { name: 'phone', text: 'Phone' },
        { name: 'address', child: 'city', text: 'City' },
    ];
    users = new Array<User>();
    constructor(private usersService: UsersService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
        this.usersService
            .getUsers()
            .pipe(take(1))
            .subscribe({ next: (response) => (this.users = [...response]), complete: () => this.cd.markForCheck() });
    }
    // I would normally use this but for demo purpose i need to manipulate with data
    //users$: Observable<User[]> = this.usersService.getUsers();

    tableAction(data: TableRowAction): void {
        const item = data.data;
        switch (data.action) {
            case 'delete': {
                this.removeDialog(item);
                break;
            }
            case 'view': {
                this.userDialog(item, true);
                break;
            }
            case 'edit': {
                this.userDialog(item, false);
                break;
            }
            default: {
                break;
            }
        }
    }

    newUser(): void {
        const dialogCfg = new MatDialogConfig();
        dialogCfg.disableClose = true;
        dialogCfg.autoFocus = true;
        dialogCfg.data = { user: new UserDialogModel('Add', 'Close') };

        const dialogRef = this.dialog.open(UserDialogComponent, dialogCfg);

        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((res) =>
                this.usersService.newUser(res).subscribe((response) => {
                    this.users = [...this.users, response];
                    this.cd.markForCheck();
                })
            );
    }

    private removeDialog(item: User): void {
        const dialogCfg = new MatDialogConfig();
        dialogCfg.disableClose = true;
        dialogCfg.autoFocus = true;
        dialogCfg.data = new RemoveDialogModel(
            'Remove user',
            `Do you really want to remove user ${item.name} ?`,
            'Delete',
            'Cancel'
        );

        const dialogRef = this.dialog.open(RemoveDialogComponent, dialogCfg);

        // remove row from table, needed to do filter manualy as the json placeholder doesnt support delete request fully
        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((res) => {
                if (!res) return;
                this.usersService
                    .removeUser(item.id)
                    .pipe(take(1))
                    .subscribe({
                        next: (response) => console.log('Deleted successfuly'),
                        complete: () => (
                            (this.users = this.users.filter((user) => user.id != item.id)), this.cd.markForCheck()
                        ),
                    });
            });
    }

    private userDialog(item: User, view: boolean): void {
        const dialogCfg = new MatDialogConfig();
        dialogCfg.disableClose = true;
        dialogCfg.autoFocus = true;
        dialogCfg.data = { user: new UserDialogModel(view ? '' : 'Save', 'Close', item), type: view ? 'view' : 'edit' };

        const dialogRef = this.dialog.open(UserDialogComponent, dialogCfg);

        // remove row from table, needed to do filter manualy as the json placeholder doesnt support delete request fully
        dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((res) => {
                if (!res) return;

                this.usersService
                    .updateUser(res)
                    .pipe(take(1))
                    .subscribe({
                        next: (response) => console.log('User updated successfuly'),
                        complete: () => {
                            this.users = this.users.map((x) => {
                                if (x.id === res.id) {
                                    return { ...res };
                                } else {
                                    return x;
                                }
                            });

                            this.cd.markForCheck();
                        },
                    });
            });
    }
}
