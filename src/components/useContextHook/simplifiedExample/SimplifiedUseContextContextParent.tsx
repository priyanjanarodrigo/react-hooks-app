import { ReactElement } from "react";
import ThemeProvider from "./ThemeContex";
import SimplifiedFunctionContextComponent from "./SimplifiedFunctionContextComponent";

const SimplifiedUseContextContextParent: React.FC = (): ReactElement => {
    return (
        <>
            <h3>Simplified Implementation Output</h3>
            <ThemeProvider>
                <SimplifiedFunctionContextComponent />
            </ThemeProvider>
        </>
    );
};

export default SimplifiedUseContextContextParent;