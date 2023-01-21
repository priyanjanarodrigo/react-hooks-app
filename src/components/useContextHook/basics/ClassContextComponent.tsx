import { Component } from "react";

// Importing the context that we created and exported in UseContextParentComponent
import { ThemeContext } from "./UseContextParentComponent";

export default class ClassContextComponent extends Component {

    private themeStyles(dark: boolean): object {
        return {
            backgroundColor: dark ? 'black' : 'white',
            color: dark ? 'white' : 'black',
            padding: '2rem',
            margin: '2rem',
            border: '1px black solid'
        };
    }

    render() {
        return (
            /**
             * This is where we consume the value of ThemeContext.
             * 
             * - Also, we can defined the passed value in any name not just as 'darkTheme'.
             *      
             *      {value => <div style={this.themeStyles(value)}>Class Component Theme</div>}
             * 
             */
            <ThemeContext.Consumer>
                {darkTheme => <div style={this.themeStyles(darkTheme)}>Class Component Theme</div>}
            </ThemeContext.Consumer>

        );
    }
}