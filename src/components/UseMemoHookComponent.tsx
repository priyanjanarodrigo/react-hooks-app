// Importing useMemo hook
import { ReactElement, useEffect, useMemo, useState } from "react";
import '../styles/use-memo-hook-component-styles.scss'

/**
 * useMemo hook
 * ============
 *  - In useMemo hook, "Memo" stands for "Memoization" which is essentially the idea of caching a value, so we don't need
 *    to re-compute it every single time that the component renders.
 * 
 *  - useMemo hook accepts 2 paramters. First parameter is the functionality we need to cache and it is passed in funtional 
 *    way as () => {}. Second parameter is the list of dependencies as an array when those are changed code/functionality inside
 *    useMemo has to be rerun. If the dependency values do not change, then the cached response it returned.
 * 
 *  - In our example below, the "slowFunction" takes an input of a number and it's always going to give us the same output every
 *    time we give it the same input. So we can cache that input value number and the output it gives us. That way, if the number
 *    doesn't change, we do not have to recalculate our slowFunction over and over again.
 * 
 *  - Why it is not recommended to overuse useMemo everywhere possible?
 *      The reason we should not need to memoize everything is because it does give you some performance overheads and some
 *      memory overhead.
 * 
 *      For example the useMemo hook must be called for every single render of the component which means that we are calling an
 *      additional function and also it is saving the value of the returned function in some memory variable. So we are forcing
 *      our memory to get larger every time we use useMemo because we have to store an additional variable in memory to store
 *      that previous value.
 * 
 *      This is not a huge deal but if we start to do this everywhere in the application, specially where we don't need it, it's
 *      going to cause additional memory usage and additional performance problems when just not using it would have been better.
 * 
 *      So it is highly recommend that we only use useMemo in the case when we actually need the performance benefis. When the
 *      function you are calling is incredibly slow useMemo is great.
 * 
 *  - There's also a second use case for useMemo and that is something called "referential equality". (value vs reference).
 *    Essentially what that is saying is that when you try to compare two differnt variables in javaScript, it's going to 
 *    compare the reference in the case of objects and arrays. For example, "myData" below is a specific object
 * 
 *          const myData: object = { id: 1, value: "Hi" }
 *     
 *      If we define another object with the same object content and values as below, even if the contents/object property values
 *      are exactly the same, those two objects are not equal (reference comparison and not content comparison)
 * 
 *          const myData2: object = { id: 1, value: "Hi" }
 * 
 *          console.log(myData === myData2)// This will print false
 * 
 *      The reason for this is that in javaScript above "myData" and "myData2" reference to two objects. (Two variable variables 
 *      referencing to two different memory locations even if they are having the same properties and values). So that is about 
 *      referential equality
 * 
 *      As we already know, inside of hooks in react we have this array of all of our dependencies. And when our dependencies
 *      change, it's going to rerun our hook.
 *  
 * References
 * ==========
 *  https://www.youtube.com/watch?v=THL1OPn72vo&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=3
 *  https://blog.webdevsimplified.com/2020-05/memoization-in-react/
 * 
 */
const UseMemoHookComponent: React.FC = (): ReactElement => {
    const [number, setNumber] = useState(0);
    const [dark, setDark] = useState(false);

    const slowFunction = (num: number): number => {
        console.log("calling slowFunction(num)");
        for (let index = 0; index < 1000000000; index++) {
            // No function body. This loop has been added just to make the function slower
        }
        return num * 2;
    }

    /** 
     * Initial implementation which calls slowFunction over and over again even if the input number is the same.
     * (This is what we solve with useMemo below)
     * 
     *      const doubleNumber: number = slowFunction(number);
    */

    const doubleNumber: number = useMemo(() => {
        return slowFunction(number);

        /** 
         * Dependency parameters as an array. (secind parameter passed in to useMemo hook)
         * In this case, the number state value is the dependency for slowFunction. Which means when the number value is changed,
         * we need to rerun the code inside useMemo hook. if the number value does not change, we do not need to rerun the code
         * inside useMemo as it is cached.
        */
    }, [number]);

    const themeStyle: object = {
        backgroundColor: dark ? 'black' : 'white',
        color: dark ? 'white' : 'black',
        // static css properties
        width: '200px',
        margin: '10px auto',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '20px'
    }

    /**
     * Important point With respect to referential equaity.
     * Conside the following use state which logs some message on console every time when themeStyle is changed.
     * So the only dependency here is "themeStyle" object.
     * 
     *      useEffect(() => {
     *          console.log('Theme changed')
     *      }, [themeStyle])
     * 
     * So when we change the "themeStyle", this conslole log statement will be printed out.
     * But also we can notice this problem where this useEffect gets executed even when the "number" state is changed.
     * But number is not a dependency for this useEffect. The reason for this also is referential equality.
     * 
     * What's happening is every time we run "handleClick" function which causes changing the "number" state, we get a new
     * themeStyle object being create as the component rerenders. And this new themeStyle object is not the same as the old 
     * themeStyle object even though they have the exact same values in the object they reference different locations in memory.
     * This is something really important to know.
     * 
     * In order to make sure that we only ever run useEffect whe our themeStyle object actually gets re updated/changed, we can
     * use useMemo again. we can use useMemo and pass in the themeStyle properties to be returned and as the dependency we put
     * that "dark" state variable as follows.
     * 
     * 
     *     const themeStyle = useMemo(() => {
     *      return {
     *         backgroundColor: dark ? 'black' : 'white',
     *         color: dark ? 'white' : 'black',
     *         // static css properties
     *         width: '200px',
     *         margin: '10px auto',
     *         border: '1px solid black',
     *         borderRadius: '5px',
     *         padding: '20px'
     *      }
     *    } ,[dark])
     * 
     * If we make the above change and rerunh and change the number, useState will not be executed and nothing will be printed on
     * console. It will only respond to clicking "Change Theme" button which causes to change "dark" state variable.
     * What happens now is that as long as we do not change the state of "dark" variable, themeStyle will not be reupdated. so
     * as we have wrapped themeStyle using useMemo, we will get the exact same reference as we had the previous time we rendered
     * our component.
     * 
     * So now (if above change has been made) our useEffect will compare the old themeStyle with the new themeStyle but they 
     * both reference the exact same object.
     */
    useEffect(() => {
        console.log('Theme changed')
    }, [themeStyle])

    const handleClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNumber(parseInt(event.target.value));
    }

    return (
        <div id="use-memo-wrapper">
            <div>
                <p>useMemo Hook</p>
                <input type="number" value={number} onChange={handleClick} />
                <div>
                    <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
                    <div style={themeStyle}>{doubleNumber}</div>
                </div>
            </div>
        </div>
    )
}

export default UseMemoHookComponent;