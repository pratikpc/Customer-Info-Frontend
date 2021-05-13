import MaterialTable, { Column } from '@material-table/core';
import { useState, useEffect } from 'react';
import useRefresh from './Refresh';
import useFetch from './Fetch';

export default function Customers(props) {
   const [data, setData] = useState();
   const { sendRequest } = useFetch();
   // const { refresh, refreshNow } = useRefresh();

   useEffect(() => {
      setData(Convert(props.data));
   }, [props]);

   return (
      <MaterialTable
         {...console.log(props.data)}
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

export function Convert(records) {
   const converted = [];
   for (const [key, value] of Object.entries(records)) {
      if (typeof value === 'string') converted.push({ key, value });
   }
   console.log(converted);
   return converted;
}
