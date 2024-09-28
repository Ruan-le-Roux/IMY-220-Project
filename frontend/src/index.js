import React from "react"
import { createRoot } from 'react-dom/client';
import App from './App';


// import ReactDom from "react-dom/client";

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App/>);

// class Greeting extends React.Component
// {
//     render()
//     {
//         return(
//             <div>
//                 <h1>Some heading for fun here work</h1>

//             </div>

//         );
//     }
// }

// const root = ReactDom.createRoot(document.getElementById("root"));
// root.render(<Greeting />);