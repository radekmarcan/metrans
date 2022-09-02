import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableItem, TableRowAction } from '@shared/model/tableItem';
import { TableSort, TableActions } from '@shared/type/table-actions';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'me-table',
    templateUrl: './table.component.html',
    styles: [
        `
            i {
                cursor: pointer;
            }
        `,
    ],
})
export class TableComponent {
    @Input() set tableItems(items: any[] | null) {
        if (items?.length && this.headings.length) {
            this.items = [...items];
            this.sortBy(this.headings[0].name, 'asc');
        }
    }
    @Input() headings!: TableItem[];

    @Output() rowEvent = new EventEmitter<TableRowAction>();

    items = new Array<any>();

    getValue(item: any, heading: string): string {
        return item[heading];
    }

    action(action: TableActions, item: any): void {
        this.rowEvent.emit(new TableRowAction(action, item));
    }

    sortBy(key: string, sort: TableSort): void {
        if (!this.items?.length) return;

        switch (sort) {
            case 'asc': {
                this.items = [...this.items.sort((a, b) => a[key].localeCompare(b[key]))];
                break;
            }
            case 'desc': {
                this.items = [...this.items.sort((a, b) => b[key].localeCompare(a[key]))];
                break;
            }
        }
    }
}
