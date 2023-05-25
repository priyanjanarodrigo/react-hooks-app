// Importing useEffect hook
import { ReactElement, useEffect, useState } from "react";
import '../styles/use-effect-hook-component-styles.scss'

/**
 * useEffect hook
 * ==============
 * 
 * - With useEffect hook, essentially we are saying, we want to do some form of side effect whenever something happens. That's the
 *   high level idea.
 * 
 * - Ex1 : Basic usage. code inside the function which is passed into useEffect hook will be executed every single time that the component
 *         renders.
 * 
 *      useEffect(() => {
 *          console.log('render');
 *      })
 *
 * - We are going to only want to do things when may be your component mounts, or you are only going to want to do something when a 
 *   specific resource on you page is changed. In order to to that, useEffect actually takes a second parameter and it's an array.
 *   Whatever we pass into this array will be values, that whenever they change, your useEffect hook will run.
 * 
 * - Ex2 : Whenever the resourceType value changes (not if the same value is reassigned), this hook will be executed automatically.
 *  
 *      useEffet(() => {
 *          console.log('render');
 *      }, [resourceType]);
 * 
 *  - If we pass an empty array as the second parameter to useEffect, the functionality (first parameter) will only be executed 
 *    once and no matter how many times that the component rerenders.
 *      
 *      useEffect(() => console.log("On mount only once"), []);
 * 
 *  - Basically the best way to think about the useEffect hook is that anytime when we want to have a side effect occurred
 *    whether it's component mount, unmount , a variable changes , state changes , props change or when anything updates
 *    and we want to do something, this is what useEffect is going to be used for.
 * 
 * References
 * ==========
 * 
 *  https://www.youtube.com/watch?v=0ZJgIjIuY7U&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=2
 *  https://blog.webdevsimplified.com/2020-04/use-effect/
 *  https://jsonplaceholder.typicode.com/
 * 
 */
const UseEffectHookComponent: React.FC = (): ReactElement => {
    
    const [resourceType, setResourceType] = useState('posts');
    const [items, setItems] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Just a console.log statement executed everytime the component renders
    // console.log("render");

    useEffect(() => {
        /**
         * This code will be executed after the return code below when the component is unmounted. 
         * This may execute first on the initial rendering/ very first time it renders before return code below
        */
        console.log("resourceType value changed")
        // Whenever the resourceType changes, this api call will be executed
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(json => setItems(json))

        return () => {
            /** 
             * This return code will be executed first before above setup code within useEffect whenever the component
             * gets unmounted. This is the ideal place to make use of any cleanup code. 
             * 
             * Every single time this useEffect gets run, whatever inside this return code gets executed first to 
             * clearn up what ever we did last time.
            */
            console.log("return from resource change")
        }
    }, [resourceType]);

    /**
     * If we pass an empty array as the second parameter to useEffect, the functionality (first parameter) will only be executed 
     * once and no matter how many times that the component rerenders.
     */
    useEffect(() => console.log("On mount only once"), []);

    const handleResize = (): void => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        /**
         * This code will be executed after the return code below when the component is unmounted. 
         * This may execute first on the initial rendering/ very first time it renders before return code below
        */
        window.addEventListener('resize', handleResize)

        return () => {
            /** 
             * Inside the return, this will be executed first before above code within useEffect whenever the component
             * gets unmounted. This is the ideal place to make use of any cleanup code. 
            */
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div id="use-effect-wrapper">
            <div>
                <p>useEffect Hook</p>
                <button onClick={() => setResourceType('posts')}>Posts</button>
                <button onClick={() => setResourceType('users')}>Users</button>
                <button onClick={() => setResourceType('comments')}>Comments</button>
                <h3>{resourceType}</h3>
                {/* Just printing out two elements on the page */}
                {<pre>{JSON.stringify(items[0])}</pre>}
                {<pre>{JSON.stringify(items[1])}</pre>}
                <h4>Window Width (change the browser window size) = {windowWidth}</h4>
            </div>
        </div>
    );
}

export default UseEffectHookComponent;