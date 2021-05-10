import { useState } from 'react';
import MaterialTable from '@material-table/core';

import Customer from './data/Customer';

export default function Customers() {
   const [custInfo] = useState([
      { 'First Name': 'Shah Rukh', 'Last Name': 'Khan', Age: '33' },
      {
         'First Name': 'Salman',
         'Last Name': 'Chunara',
         Age: '31',
         x: '4',
         y: '44',
         z: '4ae',
         t: 'eee'
      }
   ]);

   return (
      <MaterialTable
         columns={[
            { title: 'First Name', field: 'First Name' },
            { title: 'Last Name', field: 'Last Name' }
         ]}
         data={custInfo}
         title="Demo Title"
         detailPanel={rowData => {
            return <Customer data={rowData} />;
         }}
      />
   );
}
