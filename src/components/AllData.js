import { useEffect, useState } from 'react';
import Customers from './data/Customers';
import useFetch from './data/Fetch';
import useRefresh from './data/Refresh';
import MaterialTable from '@material-table/core';

export default function AllData() {
   const [custInfo, setCustInfo] = useState();
   const { refresh } = useRefresh();
   const { sendRequest } = useFetch();

   useEffect(() => {
      async function PerformAsync() {
         let data = await sendRequest(`customers`);
         setCustInfo(data);
         console.log(custInfo);
      }
      PerformAsync();
   }, [refresh]);

   return (
      <MaterialTable
         columns={[
            { title: 'First Name', field: 'First Name' },
            { title: 'Last Name', field: 'Last Name' }
         ]}
         data={custInfo}
         title="All Customer Details"
         detailPanel={rowData => {
            return (
               <Customers
                  data={rowData}
               />
            );
         }}
      />
   );
}
