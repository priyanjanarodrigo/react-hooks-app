import React, { ReactElement } from 'react';
import './App.scss';
import UseStateHookComponent from './components/useState/UseStateHookComponent';
import UseEffectHookComponent from './components/useEffect/UseEffectHookComponent';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import UseMemoHookComponent from './components/useMemo/UseMemoHookComponent';
import UseReducerParenDemoComponent from './components/useReducer/UseReducerParenDemoComponent';
import UseRefHookComponent from './components/useRef/UseRefHookComponent';
import UseCallbacklHookComponent from './components/useCallbackHook/UseCallbacklHookComponent';
import ContextDemoParent from './components/useContextHook/ContextDemoParent';

/**
 * React Hooks
 * ===========
 * 
 *  - You can only use hooks inside react functional components and you cannot use them inside
 *    class components. So, we must use a functional component in order to make use of hooks.
 * 
 *  - Class components have a different way to utilize the functionalities of hook methods.
 * 
 *  - Everytime our component runs, your hooks must execute in the exact same order.
 *    Ex: Following hooks get executed in the same order as defined.
 *      useState() - Executed firstly
 *      useState() - Executed secondly
 *      useState() - Executed Thirdly
 * 
 *  - In a situation like below, the hook method wrapped inside the if condition may or may not execute. So the execution order
 *    is not proper. In that case we will get an error saying that we cannot put a hook method inside of a if block. (even if
 *    the condition is true)
 *      
 *      if(this === something) {
 *        useState()
 *      }
 * 
 *      useState()
 *      useState()
 *      useState()
 * 
 *      Error:
 *         React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every 
 *         component render  react-hooks/rules-of-hooks.
 *      
 *  - React is able to indicate such type of errors just like in the above case.
 */

const App: React.FC = (): ReactElement => {

  return (
    <div className="App">
      <h1>React Hooks App</h1>
      <BrowserRouter>
        <Link className="navLink" to="/"><button>useState</button></Link>
        <Link className="navLink" to="/useEffect"><button>useEffect</button></Link>
        <Link className="navLink" to="/useMemo"><button>useMemo</button></Link>
        <Link className="navLink" to="/useRef"><button>useRef</button></Link>
        <Link className="navLink" to="/useContext"><button>useContext</button></Link>
        <Link className="navLink" to="/useReducer"><button>useReducer</button></Link>
        <Link className="navLink" to="/useCallback"><button>useCallback</button></Link>

        <Routes>
          <Route path="/" element={<UseStateHookComponent />}></Route>
          <Route path="/useEffect" element={<UseEffectHookComponent />}></Route>
          <Route path="/useMemo" element={<UseMemoHookComponent />}></Route>
          <Route path="/useRef" element={<UseRefHookComponent />}></Route>
          <Route path="/useContext" element={<ContextDemoParent />}></Route>
          <Route path="/useReducer" element={<UseReducerParenDemoComponent />}></Route>
          <Route path="/useCallback" element={<UseCallbacklHookComponent />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
