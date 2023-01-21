import { ReactElement } from "react";
import ThemeProvider from "./ThemeContex";
import SinplifiedFunctionContextComponent from "./SinplifiedFunctionContextComponent";

const SimplifiedUseContextContextParent: React.FC = (): ReactElement => {
    return (
        <>
            <h3>Simplified Implementation Output</h3>
            <ThemeProvider>
                <SinplifiedFunctionContextComponent />
            </ThemeProvider>
        </>
    );
};

export default SimplifiedUseContextContextParent;