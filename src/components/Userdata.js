import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Customers from './data/Customers';
import useFetch from './data/Fetch';
import Customer from './data/Customer';
import useRefresh from './data/Refresh';

import Button from '@material-ui/core/Button';

export default function Userdata() {
   const history = useHistory();
   const [custInfo, setCustInfo] = useState();
   const { refresh, refreshNow } = useRefresh();
   const { sendRequest } = useFetch();
   // const AllCust = props => <Link to="/customers" />

   const routeChange = () =>{ 
      let path = `customers`; 
      history.push(path);
    }

   useEffect(() => {
      async function PerformAsync() {
         let data = await sendRequest(`customer`);
         setCustInfo(data);
         console.log(custInfo);
      }
      PerformAsync();
   }, [refresh]);

   return (
      <Customer
         data={custInfo ? custInfo : [{}]}
         searchable={'always'}
         keyEditable={'always'}
         valueEditable={'always'}
      />
   );
}
