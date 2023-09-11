import React, { useEffect } from 'react';

const Child = () => {
    useEffect(() => {
        console.log('This is child component')
    })

    return (  
        <div>Child</div>
    );
}
 
export default Child;