import { useState, useCallback } from 'react';
import { Token } from '../AuthCheck';

export default function useHttpClient() {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const sendRequest = useCallback(
      async (url: string, method = 'GET', body = null, headers = {}) => {
         setIsLoading(true);

         try {
            const response = await fetch(
               `https://4du99ykcl8.execute-api.us-east-1.amazonaws.com/Prod/${url}`,
               {
                  method,
                  body,
                  mode: 'cors',
                  headers: {
                     ...headers,
                     Authorization: `Bearer ${await Token()}`
                  },
                  redirect: 'follow'
               }
            );
            if (!response.ok) {
               throw new Error(
                  response.status + ' : ' + response.statusText + ' : '
               );
            }

            let responseData = null;
            try {
               responseData = await response.json();
            } catch (err) {}
            setIsLoading(false);
            return responseData;
         } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
         }
      },
      []
   );

   const clearError = () => {
      setError(null);
   };

   return { isLoading, error, sendRequest, clearError };
}
