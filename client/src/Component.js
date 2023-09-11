import React , {useState} from 'react';
import Child from './Child';

const Component = () => {
    let number1 = 10;
    const [number2, setNumber2] = useState(5);

    const handleClick1 = () => {
        console.log('before', number1);
        number1++;
        console.log('after', number1);
    }

    const handleClick2 = () => {
        console.log('before', number2);
        setNumber2(number2 + 1);
        console.log('after', number2);
    }

    return ( 
        <> 
            <div>
                {number1}
            </div>
            <button onClick={handleClick1}>Increase 1</button>
            <div>
                {number2}
            </div>
            <button onClick={handleClick2}>Increase 2</button>
            <Child />
        </>
    );
}
 
export default Component;