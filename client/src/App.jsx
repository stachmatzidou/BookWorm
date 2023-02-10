import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
            <Routes>
                <Route path="/" element={<div>BookWorm</div>}></Route>
            </Routes>
    );
}

export default App;
