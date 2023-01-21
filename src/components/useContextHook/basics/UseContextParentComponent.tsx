import React, { ReactElement, useState } from "react";
import '../../../styles/use-context-hook-component-styles.scss'
import FunctionContextComponent from "./FunctionContextComponent";
import ClassContextComponent from "./ClassContextComponent";
/**
 * useContext Hook
 * ===============
 * 
 *  - When we use context, it is broken into two different sections.
 *      
 *      1. We have the context provider (ThemeContext.Provider in below example) which is what you want to wrap all of the code 
 *         that needs access to the information in the context (in ThemeContext as in below example).
 *      2. And a single prop called "value" which is going to be whatever the value of your context is.
 *  
 *  - Everything inside of the provider (FunctionContextComponent and ClassContextComponent and their children(if any) down the 
 *    hierarchy in ThemeContext.Provider), have the access to the variable assiged to the "value" prop in the context provider.
 * 
 *  - It's important to notice that the context is for passing down the props essentially all the way down to the any of the children
 *    without having to manually pass as a specific props for each component, it's just available to all of them and it's kind of like
 *    a global state for the components inside provider and for their child components and so on.
 * 
 * References
 * ==========
 *  
 * https://www.youtube.com/watch?v=5LrDIWkK_Bc&list=PLZlA0Gpn_vH8EtggFGERCwMY5u5hOjf-h
 *  
 *  https://blog.webdevsimplified.com/2020-06/use-context/
 *  
 *  https://reacttraining.com/blog/react-context-with-typescript/
 */


/**
 * - An example how to define an interface as the value of context and assign.
 * 
 *  interface ThemeContextValue { 
 *      darkTheme: boolean; 
 *  }
 * 
 *  export const ThemeContext = React.createContext<ThemeContextValue>({darkTheme: false});
 */

// Creating the context and assigning a default value. This is outside the component scode and exported separately.
export const ThemeContext = React.createContext<boolean>(false);

const UseContextParentComponent: React.FC = (): ReactElement => {

    const [darkTheme, setDarkTheme] = useState(true);

    const handleToggleTheme = (): void => setDarkTheme(prevDarkTheme => !prevDarkTheme);

    return (
        <div id="use-context-wrapper">
            <div>
                <p>useContext Hook</p>
            </div>
            <div>
                <h3>Basic Implementation Output</h3>
                <ThemeContext.Provider value={darkTheme}>
                    <button onClick={handleToggleTheme}>Toggle Theme</button>
                    <FunctionContextComponent />
                    <ClassContextComponent />
                </ThemeContext.Provider>
            </div>
        </div>
    );
};

export default UseContextParentComponent;