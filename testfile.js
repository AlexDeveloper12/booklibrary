import {useCallback, useState} from "react";

export default function Testfile(){
    const [counter,setCounter] = useState(0);

    const handleIncrement = useCallback(()=>{
        setCounter((prev)=> prev + 1);
        //dependency removed
    },[]);

    const handleDelayedIncrement = useCallback(()=>{
        //using prev state helps us to avoid unexpected behaviour
        setTimeout(()=>setCounter((prev)=>prev+1),1000);
    }, [counter]);


    return(
        <div>
            <h1>{`Counter is ${counter}`}</h1>
            <button onClick={handleIncrement}>Instant increment</button>
            <button onClick={handleDelayedIncrement}>Delayed increment</button>
        </div>
    )

}