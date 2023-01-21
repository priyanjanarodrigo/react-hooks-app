import { ReactElement } from "react";
import UseContextParentComponent from "./basics/UseContextParentComponent";
import SimplifiedUseContextContextParent from "./simplifiedExample/SimplifiedUseContextContextParent";

const ContextDemoParent: React.FC = (): ReactElement => {
    return (
        <div>
            <UseContextParentComponent />
            <SimplifiedUseContextContextParent />
        </div>
    );
}

export default ContextDemoParent;