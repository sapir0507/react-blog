import { useState, useEffect } from "react";

const useFetch = (url) => {
    
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isError, setError] = useState(null);
   
    useEffect(()=>{ /*runs when page randers*/ 
        const abourtCont = new AbortController();
        fetch(url, {signal: abourtCont.signal})
            .then(res => {
                if(res.ok) return res.json();
                else{
                    throw Error('could not fatch the data for that resource');
                    setIsPending(false);
                }
            })
            .then((data) => {
                console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                }
                else{
                    setError(err.message);
                    setIsPending(false);
                }
            })
        return () => abourtCont.abort();
    }, /*see if any var,... changed. if empty, only runs on the first 
    rander*/ [url])

    return {data, isPending, isError}
}

export default useFetch;