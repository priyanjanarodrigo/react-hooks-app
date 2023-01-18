import { ReactElement } from "react";
import '../styles/use-context-hook-component-styles.scss'

const UseContextHookComponent: React.FC = (): ReactElement => {
    return (
        <div id="use-context-wrapper">
            <div>
                <p>useContext Hook</p>
            </div>
        </div>
    );
};

export default UseContextHookComponent;