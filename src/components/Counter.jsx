import React, {useState} from 'react';

// const Counter = () => {
//     return (
//         <div>
//
//         </div>
//     );
// };


function Counter({textData}){
    const [count, setCount] = useState(0)

    function increment(){
        setCount(count + 1)
        // console.log(count)
    }
    function decrement(){
        setCount(count - 1)
        // console.log(count)
    }

    return(

        <div className="counterDiv">
            <h1>{textData}</h1>
            <h1>{count}</h1>
            <button onClick={decrement}>decrement</button>
            <button onClick={increment}>increment</button>
        </div>



    )
}

export default Counter;