// Importing useRef hook
import React, { ReactElement, useEffect, useRef, useState } from "react";
import '../styles/use-ref-hook-component-styles.scss'


/**
 * useRef hook
 * ===========
 * 
 * - Basic usage.Consider this state:
 * 
 *      const [renderCount, setRenderCount] = useState(0)
 * 
 *  If we use useEffect as follows to calculate the number of times that the component rendered, we'll end up
 *  with a infinite loop which calls the useEffect.
 * 
 *      useEffetct(()=> setRenderCount(prevRenderCount => prevRenderCount + 1));
 * 
 *  Because when we update the state, we cause the component to re-render. So the first time we render the component, it's going 
 *  to set the state of renderCount which causes it again to re-render the component. And again the state is set and again 
 *  causes to re-render. Likewise it will be continued as a infinite loop. So the state is not the way to keep track/ calculate
 *  renderCount.
 * 
 *  The solution for this is to use something called "useRef". Refs is very similar to state and that it persists between
 *  renders of the component. But the important thing to note about the refs vs state is that a ref does not cause the component
 *  to re-render when it gets changed. So insted of using state for renderCount as mentioned above, we can use useRef as follows. 
 * 
 *      const renderCount = useRef(0)
 * 
 *  What useRef returns is not an array like useState, instead it returns a single object with a single property called current
 *  with the default value we passed as follows (with the property we passed as default)
 * 
 *      { current : 0 }
 * 
 *  (Internally represents as const renderCount = { current: 0 })
 * 
 *  Simply, the "renderCount" is an object with "current" property, and when we update that current property that is what gets persisted
 *  between component renders. So we can now calculate renderCount using a useEffect as follows
 *  
 *      useEffect(() => {
 *          renderCount.current = renderCount.current + 1
 *      });
 * 
 *  So again the important fact is that useRef is very similar to useState and that we can store a previous value in it and it persists
 *  between different renders but it does not cause the component to re-render like state does.
 * 
 * 
 * - But probably the biggest use case for useRef could be to reference elements inside of the HTML. This is actually so popular.
 *   Each element inside of our HTML document has a "ref" attribute. So we can set that to any ref that we want.
 *  
 * - Do not abuse or misuse useRef by managing variable values attached to HTML elements (input elements for example) without 
 *   using useState. Because when we change the ref value, it may reflect on an input element for example but the underlying component state
 *   binded as the value of that particular element has not been updated.
 * 
 * 
 * - You always want to do all the management through react state or props instead of manually setting these values.
 * 
 * References
 * ==========
 * 
 *  https://www.youtube.com/watch?v=t2ypzz6gJm0&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h&index=4
 *  https://blog.webdevsimplified.com/2020-05/use-ref/
 * 
 */
const UseRefHookComponent: React.FC = (): ReactElement => {
    const [name, setName] = useState('');
    const renderCount = useRef(0)

    useEffect(() => {
        /** 
         * renderCount.current can be changed any number of time as we want and
         * we'll never ever cause our component to re-render because it is completelyt
         * separate from our component render cycle.
         */
        renderCount.current = renderCount.current + 1
    });

    const [myText, setMyText] = useState('');
    //const inputRef = useRef() // javaScript way (without type safety)
    const inputRef = React.useRef<HTMLInputElement>(null) // Reference for the input element through which myText value is input.

    const focus = (): void => {
        /**
         * Here inputRef.current is the HTML input element. Like we use document.querySelector() for selecting an element,
         * it gives us the exact same DOM node. This is the most common use case.
        */
        inputRef.current?.focus();

        /**
         * Take a look at this example:
         * 
         *  inputRef.current.value = "Test";
         * 
         * Do not practise that because it may reflect and update the value on the input element but the actual state myText is
         * not getting updated.You always want to do all the management through react state or props instead of manually setting
         * these values.
         * 
         * 
         * Also it ia not recommend to append childs via refs. Instead do that using jsx/ tsx
         *      NOT RECOMMENDED -> inputRef.current?.appendChild 
         */
    };


    /**
     * Another great use of useRef will be to store the previous value of a state variable. Because there's no other way to do that.
     * Let's say we want to keep tract of the name.
     */

    const previousName = useRef('');

    useEffect(() => {
        previousName.current = name;
    }, [name])

    /**
     * Refs are really useful for not only accessing DOM elements but they are useful for persisting values across renders
     * without actually causing a re-render. Otherwise, in functional components, there's no way we can  persisting values 
     * across renders without actually causing a re-render.
     */

    return (
        <div id="use-ref-wrapper">
            <p>useRef Hook</p>
            {/* Basic usage */}
            <div>
                <input value={name} onChange={e => setName(e.target.value)} />
                <p>My name is  {name} and it used to be {previousName.current}</p>
                <p>I rendered {renderCount.current} times</p>
            </div>

            {/* Referencing elements inside of the HTML */}
            <div>
                <input ref={inputRef} value={myText} onChange={e => setMyText(e.target.value)} />
                <div>My text is {myText}</div>
                <button onClick={focus}>Focus</button>
            </div>
        </div>
    )
}

export default UseRefHookComponent;