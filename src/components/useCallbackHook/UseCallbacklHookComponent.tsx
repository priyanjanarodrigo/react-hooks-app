// Importing useCallback hook
import { ReactElement, useCallback, useState } from "react";
import List from "./List";

import '../../styles/use-callback-hook-component-styles.scss'

/**
 * References
 * ==========
 * 
 *  https://www.youtube.com/watch?v=_AyFP5s69N4&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h
 * 
 *  https://blog.webdevsimplified.com/2020-05/memoization-in-react/
 */

const UseCallbacklHookComponent: React.FC = (): ReactElement => {
    const [number, setNumber] = useState(1);
    const [isDark, setIsDark] = useState(false);

    /**
    *
    * useCallback Hook
    * ===============
     * 
     * (This function is just to act as an API call which returns 3 incremented values for example.)
     * 
     * This way, getItems function is recreated everytime that the component renders even if the number value remains the same.
     * (Example situation - Clicking Toggele Theme button)
     * Which also causes the List component to re-render as getItems is defined inside a dependency list array for a useState hook.
     * 
     *       const getItems = (): number[] => [number, number + 1, number + 2]
     * 
     * This is where we need to use useCallback hook method so we can resolve this issue.
     * 
     * useCallback and useMemo are similar in some ways but what useCallback does is that it is not going to re-run the code
     * inside of it and unless certain parameters change and that means every single time we call this component, getItems
     * functions is only going to be updated when it actually needs to. (only when the number value changes).
     * 
     * With the below implementation, List component will not re-render if we click Toggle Theme button in this component.
     * That's because, useCallback only recreates the getItems function only if the number value is chganged. So the useEffect
     * hook in List component which has getItems as a dependency will not be triggered as getItems is not changed.
     * 
     * Below useCallback code is very similar to useMemo. But the one big differenece there is that, useMemo takes a function
     * and it's going to return the return value of that function. But useCallback is different. it takes a function and 
     * it is going to return the function itself.
     *  
     *  Ex : (case 1): useMemo - returns the value of the function
     *      const getItems = useMemo(() => {return [number, number + 1, number + 2]; }, [number]);
     *      
     *      Here getItems will be assigned with only the return value/ array here.
     *          
     *          getItems = [number, number+1, number+2]
     * 
      *  Ex : (case 2): useCallback - returns the entire function.
     *      const getItems = useCallback(() => {return [number, number + 1, number + 2]; }, [number]);
     *      
     *      Here getItems will be assigned with the entire function/actual function itself.
     *          
     *          getItems = () => {return [number, number + 1, number + 2];
     *      
     *      We can pass the parameter also if required.
     * 
     * - The reason where we need to use useCallback is refenrencial equality (described in useMemo). And also we can 
     *   apply useCallback where creating a function is really really slow (ex: more time consuming/ costly)
     * 
     */
    const getItems = useCallback(() => {
        return [number, number + 1, number + 2];
    }, [number]);

    const theme: object = {
        backgroundColor: isDark ? 'black' : 'white',
        color: isDark ? 'white' : 'black',
        padding: '2rem',
        border: '1px black solid'
    };

    return (
        <div id="use-callback-wrapper">
            <div>
                <p>useCallback Hook</p>
                <div style={theme}>
                    <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
                    <button onClick={() => setIsDark(prevIsDark => !prevIsDark)}>Toggle Theme</button>
                    <List getItems={getItems} />
                </div>
            </div>
        </div>
    );
};

export default UseCallbacklHookComponent;