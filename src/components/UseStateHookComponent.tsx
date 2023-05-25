// Importing useState hook
import { ReactElement, useState } from "react";
import '../styles/use-state-hook-component-styles.scss'

/**
 * useState hook
 * =============
 * 
 *  - To use useState hook, all we need to do is importing "useState" and calling it as a function. 
 *    The value that we pass to useState hook will be what the default state is.
 * 
 *      Ex: Here we are calling uyseState with the default value/state 4
 *          useState(4);     
 * 
 *  - What useState does is that it returns us an array with 2 values.
 *      
 *      const array = useState(4);
 * 
 *  - The recommended practise is to destructure this array as it returns 2 values. First value (in below example - myNumber) 
 *    is going to be the current state at every single iteration of our render function (return) there in the component. 
 *    And the second value of the array which is returned by the useState hook is a function which is going to allow us to
 *    update the state (in below example - setMyNumber)
 * 
 *      const [myNumber, setMyNumber] = useState(4)
 * 
 *  - Whenever we update the state, our component will rerender.
 * 
 *  - When dealing with object values as state, useState behaves a liitle bit differently in functional components when comparing
 *    with class components.
 * 
 * References
 * ==========
 *  https://www.youtube.com/watch?v=O6P86uwfdR0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h
 *  https://blog.webdevsimplified.com/2020-04/use-state/
 */

const UseStateHookComponent: React.FC = (): ReactElement => {
    const getInitialCount = (initialValue: number = 0): number => {
        console.log(`getInitialCount invoked with initialValue = ${initialValue}`);
        return initialValue;
    }

    /**
     * Assigning the default state in the functional way.
     * 
     * When we follow this approach, this assignment, which is execution of "getInitialCount" method, 
     * will only be called once and not for every time that the state of "count" updated.
     * 
     * Importantly defining the state value directly (as below example) causes the assigned value get called every single 
     * time the component renders/ rerender. This is the way if we want to call the state value each time the component rerenders.
     *
     *      const [count, setCount] = useState(getInitialCount());
     *      const [count, setCount] = useState(21);
     * 
     * Instead, here, what we have done here is executing the "getInitialCount" method within a lambda function call as below.
     * Here the value/ function will call only the first time that our component renders.
     * 
     * So if you are doing something where you have to do a really complex, slow computation for the initial state, better to
     * use the functional way of assigning the initial state using useState so thar will only be executed only once.
     */
    const [count, setCount] = useState(() => getInitialCount());

    const incrementCountBy2 = (): void => {

        /** 
         * This is the functional way of updting/changing the state.
         * This is the recommended approach if we are making the change to the state depending on the previous state.
         * What is automatically passed as the previousCount is the previous value/ state of the 'count'.
         * 
         * For example assume that the previous value of "count" is 10.
         * In that case, the resulting execution of the code below will be : 10 => 10+1 (the output from which will be 11).
         * That means state of the "count" will be updated as 11.
         * 
         * Assuming that "count" value is 10, below execution can be described as:
         *      setCount(10 => 10+1) which sets the count as 11
         *      setCount(11 => 11+1) which sets the count as 12 based on the previous state 11.
        */
        setCount(previousCount => previousCount + 1); // State will be incremented by 1 based on the previousCount value.
        setCount(previousCount => previousCount + 1); // Again the state will be incremented by 1 based on the previousCount value.

        /**
         * If we do the same steps above as follows without using funtion calling approach as follows, the state will not be
         *  incremented by 2 at the end of execution.
         * 
         *      setCount(count + 1);
         *      setCount(count + 1);
         * 
         * This code will execute the count by one but not by 2. Because, our "count" value here is just the value of count when we
         * render our function. Not the previous value. It will look like follows if we break it down (assume existing count value is 3)
         *      
         *      setCount(3 + 1)
         *      setCount(3 + 1)
         * 
         * "count" will be considered as 3 and the previous state is not considered. So increment will only be done by 1. It's basically
         * overwriting each other.
         */
    }

    const decrementCountBy2 = (): void => setCount(previousCount => previousCount - 2);

    // Assignig an object as state
    const [data, setData] = useState({ id: 1, theme: "Blue" })

    const id = data?.id;
    const theme = data?.theme;

    const incrementId = (): void => {
        /**
         * When updating the state of a particular property of an object. It is better to spread/merge the previous values/state of
         * the object and then change the required properties accordingly as follows. Because rest of the object properties
         * do not get merged automatically.
         *
         * In general, we need to use multiple useState hooks for separate values. So, it's better to use a different useState hook
         * for the theme (ex: const [theme, setTheme] = useState("dark");)
         *  
         * Otherwilse, there may be errors or there may be missing object properties other than the one/ones you are changing.
         *
         */
        setData(previousData => ({ ...previousData, id: previousData.id + 1 }))
    }

    const decrementId = (): void => setData(previousData => ({ ...previousData, id: previousData.id + 1 }))

    return (
        <div id="use-state-wrapper">
            <p>useState Hook</p>
            <div>
                <button onClick={decrementCountBy2}>-2</button>
                <span id="count-display-area">{count}</span>
                <button onClick={incrementCountBy2}>+2</button>
            </div>

            <div>
                <button onClick={decrementId}>-1</button>
                <span id="count-display-area">{"id = "} {id} {"|  theme = "} {theme}</span>
                <button onClick={incrementId}>+1</button>
            </div>
        </div>
    );
}

export default UseStateHookComponent;