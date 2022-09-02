import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RemoveDialogModel } from '@shared/model/dialog-model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'remove-dialog',
    template: `
        <h2 mat-dialog-title>{{ dialogData.title }}</h2>
        <mat-dialog-content>
            <p class="text-gray-800 text-sm">{{ dialogData.messageText }}</p>
        </mat-dialog-content>
        <mat-dialog-actions class="flex justify-end">
            <button
                class="mx-4 border px-4 py-1 rounded text-me-blue border-me-blue hover:bg-me-blue hover:bg-opacity-20 cursor-pointer"
                mat-dialog-close>
                {{ dialogData.actionClose }}
            </button>

            <button
                class="border px-4 py-1 rounded text-red-500 border-red-500 hover:bg-red-100 cursor-pointer"
                [mat-dialog-close]="true">
                {{ dialogData.action }}
            </button>
        </mat-dialog-actions>
    `,
})
export class RemoveDialogComponent {
    dialogData = {} as RemoveDialogModel;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.dialogData = { ...data };
    }
}
