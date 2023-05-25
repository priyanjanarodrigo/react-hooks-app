// Importing useReducer hook
import { ReactElement, useReducer } from "react";

/**
 * useReducer Hook
 * ===============
 * 
 *  - useState is not the only hook that facilitates to manage state. There's something called
 *    "useReducer" which also allows you to manage state and re-render a component whenever that state
 *    changes.
 * 
 *  - The idea behind "useReducer" is that it gives you a more concrete way to handle complex state.
 *    It gives you a set actions that you can perform on your state that's going to convert your current 
 *    state to a new version of the state based on the action that you send it.
 * 
 *  - useReducer hook has a very similar pattern to Redux and it takes away a lot of boilerplate code 
 *    that assiciates with Redux.
 * 
 * - We are going to take this initial example and refactor it to use usereducer
 * 
 *      const [count, setCount] = useState(0);
 *      const increment = (): void => setCount(prevCount => prevCount + 1);
 *      const decrement = (): void => setCount(prevCount => prevCount + 1);
 * 
 *     return (
 *          <div id="basic-component">
 *               <h3>useReducer basic component</h3>
 *               <button onClick={decrement}>-</button>
 *               <span>{count}</span>
 *               <button onClick={increment}>+</button>
 *          </div>
 *      )
 * 
 * References
 * ==========
 * 
 *  https://www.youtube.com/watch?v=kK_Wqx3RnHk&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h
 * 
 *  https://blog.webdevsimplified.com/2020-06/use-reducer/
 */


const ACTIONS = {
    INCREMENT: "increment",
    DECREMENT: "decrement",
}

// This is just an interface for defining the state
interface GlobalState {
    count: number;
}

/**
 * This is the reducer function that we pass as the first parameter if useReducer hook.
 * reducer function is going to take two different parameters. First one is the state of the application
 * and the second one is the action.
*/
const reducer = (state: GlobalState, action: any): GlobalState => {
    switch (action?.type) {
        case ACTIONS.INCREMENT: return { count: state.count + 1 }
        case ACTIONS.DECREMENT: return { count: state.count - 1 }
        default: return state
    }
};

const UseReducerBasicsComponent: React.FC = (): ReactElement => {

    /**
     * useReducer hook takes two different paramters.
     *  1. reducer - A function that we perform on our state to get new state and it's also going to have an initial value.
     *  2. initial state - Initial value for the state (ex: {count: 0})
     * 
     * We just can pass the default value as a primitive value (ex: 21) instead of an object, but generally when we work with 
     * reducers and useReducer, we are going to use objects instead of actual values. 
     * 
     * Return values from useReducer will be state and the second return value will be a function called dispatch.
     * 
     * dispatch function is what we call in order to update our state. Essentially it is going to call the
     * reducer function for us given certain parameters.
     * 
     * reducer accepts two parameters
     *  1. state - current state of the application
     *  2. action - action is what we pass into the dispatch function
     * 
     * So whenever we call dispatch, what's going to happen is whatever we call dispatch with is going to be set to the action 
     * variable (in reducer function) and the our current state is going to be in this state variable. And the reducer is going to return 
     * our new updated state.
     * 
     * useReducer is really useful for more complex state management rather than simple state management.
     */
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    const increment = (): void => dispatch({ type: ACTIONS.INCREMENT });

    const decrement = (): void => dispatch({ type: ACTIONS.DECREMENT });

    return (
        <div id="basic-component">
            <h3>useReducer basic component</h3>
            <button onClick={decrement}>-</button>
            <span>{state.count}</span>
            <button onClick={increment}>+</button>
        </div>
    )
}

export default UseReducerBasicsComponent;
