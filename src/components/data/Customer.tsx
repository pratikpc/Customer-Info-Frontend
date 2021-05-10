import MaterialTable, { Column } from '@material-table/core';

export type RowData = { key: string; value: string };
export type Records = { [s: string]: string };

export default function Customer<T>(props: {
   data: T;
   searchable?: boolean;
   keyEditable?:
      | 'always'
      | 'onUpdate'
      | 'onAdd'
      | 'never'
      | ((columnDef: Column<RowData>, rowData: RowData) => boolean);
   valueEditable?:
      | 'always'
      | 'onUpdate'
      | 'onAdd'
      | 'never'
      | ((columnDef: Column<RowData>, rowData: RowData) => boolean);
}) {
   return (
      <MaterialTable
         options={{
            search: props.searchable || false,
            showTitle: props.searchable || false,
            toolbar: props.searchable || false,
            paging: false,
            rowStyle: { textAlign: 'center' }
         }}
         columns={[
            {
               title: 'Key',
               field: 'key',
               editable: props.keyEditable || 'never'
            },
            {
               title: 'Value',
               field: 'value',
               editable: props.valueEditable || 'never'
            }
         ]}
         data={Convert(props.data)}
      />
   );
}

export function Convert<T>(records: T): RowData[] {
   const converted: RowData[] = [];
   for (const [key, value] of Object.entries(records)) {
      if (typeof value === 'string') converted.push({ key, value });
   }
   console.log(converted);
   return converted;
}
