// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Link Tracker Dashboard</h1>
            </header>
            <main>
                <Dashboard />
            </main>
        </div>
    );
}

export default App;
