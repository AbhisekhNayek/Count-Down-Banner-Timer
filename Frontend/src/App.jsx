import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Counter from './components/banner1';
import Content from './components/Content';

function App() {
    return (
        <div className="App">
            <Content />
            <Dashboard />
            <Counter />
        </div>
    );
}

export default App;
