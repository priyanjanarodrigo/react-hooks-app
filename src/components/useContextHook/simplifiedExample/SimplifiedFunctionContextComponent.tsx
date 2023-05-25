import { ReactElement } from "react";
import { useTheme, useThemeUpdate } from "./ThemeContex";

const SimplifiedFunctionContextComponent: React.FC = (): ReactElement => {
    const darkTheme = useTheme();
    const themeUpdate = useThemeUpdate();
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
        <>
            <button onClick={themeUpdate.toggleTheme}>Toggle Theme</button>
            <div style={themeStyles(darkTheme)}>Functional Component Theme</div>
        </>
    );
}

export default SimplifiedFunctionContextComponent;