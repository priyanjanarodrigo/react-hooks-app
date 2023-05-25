import { ReactElement } from "react";
import '../../styles/use-reducer-hook-component-styles.scss'
import UseReducerBasicsComponent from "./UseReducerBasicsComponent";
import UseReducerToDoComponent from "./UseReducerToDoComponent";

const UseReducerParenDemoComponent: React.FC = (): ReactElement => {
    return (
        <div id="use-reducer-wrapper">
            <div>
                <p>useReducer Hook</p>
                <UseReducerBasicsComponent />
                <UseReducerToDoComponent />
            </div>
        </div>
    );
};

export default UseReducerParenDemoComponent;