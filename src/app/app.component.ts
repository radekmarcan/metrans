import { Component } from '@angular/core';
import { MenuItem } from './core/model/menuItem';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: [
        `
            main {
                height: calc(100vh - 3.5rem);
            }
        `,
    ],
})
export class AppComponent {
    menuItems = new Array<MenuItem>();
    constructor() {
        this.menuItems = [
            new MenuItem('Users', 'Users Overview', '/users'),
            new MenuItem('Posts', 'Latest posts of users', '/posts'),
        ];
    }
}
