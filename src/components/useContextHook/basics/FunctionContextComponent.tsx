// Importing useContext hook
import { ReactElement, useContext } from "react";

// Importing the context that we created and exported in UseContextParentComponent
import { ThemeContext } from "./UseContextParentComponent";

const FunctionContextComponent: React.FC = (): ReactElement => {

    /**
     * Here we pass the created context which is ThemeContext into useContext hook method
     * as a parameter and useContext will return the value of it. Here we are catching
     * that value with the variable darkTheme.
     */
    const darkTheme = useContext(ThemeContext);

    const themeStyles = (dark: boolean): object => {
        return {
            backgroundColor: dark ? 'black' : 'white',
            color: dark ? 'white' : 'black',
            padding: '2rem',
            margin: '2rem',
            border: '1px black solid'
        };
    }

    return (
        <div style={themeStyles(darkTheme)}>Functional Component Theme</div>
    )
}

export default FunctionContextComponent;