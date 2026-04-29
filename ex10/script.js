const { useState } = React;

function App() {
 const [text, setText] = useState("hello CGU!!");

 const changeText = () => {
 setText(text + "被點了");
 };

 return (
 <div>
 <h1 onClick={changeText}>
 {text}
 </h1>
 </div>
 );
 }

const root = ReactDOM.createRoot(document.getElementById("root"));
 root.render(<App />);
