import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenuItem } from '../../model/menuItem';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'me-header',
    template: `
        <div class="w-100 bg-me-blue h-14 font-thin text-2xl flex flex-row justify-center py-auto text-white items-center">
            <span
                class="mx-4 hover:cursor-pointer hover:font-semibold"
                [title]="item.label"
                [routerLink]="item.route"
                [routerLinkActive]="'font-semibold'"
                *ngFor="let item of items">
                {{ item.name }}
            </span>
        </div>
    `,
})
export class HeaderComponent {
    @Input() items!: MenuItem[];
}
