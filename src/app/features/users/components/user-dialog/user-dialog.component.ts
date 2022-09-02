import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDialogModel } from 'src/app/features/users/model/user';

@Component({
    selector: 'user-dialog',
    templateUrl: './user-dialog.component.html',
})
export class UserDialogComponent implements OnInit {
    dialogData = {} as UserDialogModel;
    type = 'view';
    form!: FormGroup;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<UserDialogComponent>
    ) {
        this.dialogData = { ...data.user };
        this.type = data.type;
        this.initForm();
    }

    ngOnInit(): void {}

    private initForm(): void {
        this.form = this.fb.group({
            id: [''],
            name: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            address: this.fb.group({
                street: '',
                suite: '',
                city: ['', Validators.required],
                zipcode: '',
                geo: {},
            }),
            phone: ['', Validators.required],
            website: [''],
            company: this.fb.group({
                name: ['', Validators.required],
                catchPhrase: '',
                bs: '',
            }),
        });

        this.dialogData.data && this.form.setValue(this.dialogData.data);
    }

    isViewOnly(): boolean {
        return this.type === 'view' ? true : false;
    }

    controlInvalid(name: string, parent?: string): boolean {
        let res = false;
        if (parent) {
            res =
                (this.form.get(`${parent}.${name}`)?.invalid &&
                    (this.form.get(`${parent}.${name}`)?.dirty || this.form.get(`${parent}.${name}`)?.touched)) ??
                false;
        } else {
            res = this.form.controls[name].invalid && (this.form.controls[name].dirty || this.form.controls[name].touched);
        }

        return res;
    }

    submit() {
        if (this.type === 'view') this.dialogRef.close();

        if (this.form.valid) {
            this.dialogRef.close(this.form.value);
        }
    }
}
