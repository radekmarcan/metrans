import { TableActions } from '@shared/type/table-actions';

export interface TableItem {
    name: string;
    text: string;
    child?: string;
}

export class TableRowAction {
    constructor(public action: TableActions, public data: any) {}
}
