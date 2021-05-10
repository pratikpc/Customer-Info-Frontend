import React, { useState } from 'react';
import { Token } from './AuthCheck';
import MaterialTable from 'material-table';

import useFetch from './data/Fetch';
import useRefresh from './data/Refresh';
import Open from './data/Open';

import DeleteForever from '@material-ui/icons/DeleteForever';
import Add from '@material-ui/icons/AddRounded';
import Refresh from '@material-ui/icons/RefreshRounded';

export default function Customers() {
   const { sendRequest } = useFetch();
   const [ custInfo, setCustInfo ] = useState([])

   React.useEffect(() => {
      async function PerformAsync() {
         console.log(await Token());
         const results = await sendRequest(`customers`);
         setCustInfo(results);
      }
      PerformAsync();
   }, []);
   return (
         <MaterialTable
          columns={[
            { title: 'First Name', field: 'FirstName' },
            { title: 'Last Name', field: 'LastName' },
            { title: 'Address', field: 'Address'}
          ]}
          data={custInfo}
          title="Demo Title"
        />
   );
}
