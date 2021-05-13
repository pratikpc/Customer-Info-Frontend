import MaterialTable from '@material-table/core';
import { useState, useEffect } from 'react';

export default function Customer(props) {
   const [data, setData] = useState();

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
         data={data}
         title="Login Customer Detail"
         editable={{
            onRowAdd: newData =>
               new Promise((resolve, reject) => {
                  setTimeout(() => {
                     console.log(data);
                     setData([...data, newData]);
                     console.log(data);
                     resolve();
 
                  }, 1000);
               }),
            onRowUpdate: (newData, oldData) =>
               new Promise((resolve, reject) => {
                  setTimeout(() => {
                     const dataUpdate = [...data];
                     const index = oldData.tableData.id;
                     dataUpdate[index] = newData;
                     setData([...dataUpdate]);
                     resolve();
                  }, 1000);
               })
         }}
      />
   );
}

export function Convert(records) {
   const converted = [];
   for (const [key, value] of Object.entries(Object.assign({}, ...records))) {
      if (typeof value === 'string') converted.push({ key, value });
   }
   console.log(converted);
   return converted;
}
