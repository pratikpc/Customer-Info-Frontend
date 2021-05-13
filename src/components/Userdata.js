import { useEffect, useState } from 'react';
import useFetch from './data/Fetch';
import Customer from './data/Customer';
import useRefresh from './data/Refresh';


export default function Userdata() {
   const [custInfo, setCustInfo] = useState();
   const { refresh } = useRefresh();
   const { sendRequest } = useFetch();

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
