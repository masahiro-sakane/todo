import { TodoProvider } from './context/TodoContext';
import { CategoryProvider } from './context/CategoryContext';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import CategoryManager from './components/CategoryManager';
import './App.css';

function App() {
  return (
    <CategoryProvider>
      <TodoProvider>
        <div className="app">
          <header className="app-header">
            <h1>TODO App</h1>
            <p className="app-subtitle">タスクを整理して生産性を向上</p>
          </header>

          <main className="app-main">
            <div className="container">
              <div className="sidebar">
                <CategoryManager />
                <TodoFilters />
              </div>

              <div className="content">
                <TodoList />
              </div>
            </div>
          </main>

          <footer className="app-footer">
            <p>&copy; 2025 TODO App. Built with React + Node.js + SQLite</p>
          </footer>
        </div>
      </TodoProvider>
    </CategoryProvider>
  );
}

export default App;
