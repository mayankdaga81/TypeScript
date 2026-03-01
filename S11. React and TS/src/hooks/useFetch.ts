

// Custom hooks requires you to create interface always. We will be creating a generic intrface here, and understand how this would work in a React project.

import { useState, useEffect } from "react";

interface FetchState<T>{
    data:T | null;
    loading: boolean;
    error: T | null
}

// In the state creation below, we have used varaible of Type FetchState, which will have values like dataa, loading, and error.
// useState<FetchState<T>>, Here, FetchState<T> is the type for useState, and T is the type for FetchState.

export function useFetch<T>(url:string) : FetchState<T>{
    const [state, setState] = useState<FetchState<T>>({data: null, loading:true, error:null});
    
    // perform the fetch when the url changes
    useEffect(() => {
        setState({ data: null, loading: true, error: null });

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
                return res.json() as Promise<T>;
            })
            .then((data) => {
                setState({ data, loading: false, error: null });
            })
            .catch((err) => {
                setState({ data: null, loading: false, error: err as any });
            });
    }, [url]);

    return state;
}