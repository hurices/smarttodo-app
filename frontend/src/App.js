import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import AddTodoForm from './components/AddTodoForm';

function App() {
  // Récupérer les tâches depuis localStorage au démarrage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('smarttodo-tasks');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [error, setError] = useState('');

  // Sauvegarder automatiquement quand todos change
  useEffect(() => {
    localStorage.setItem('smarttodo-tasks', JSON.stringify(todos));
  }, [todos]);

  // Ajouter une tâche (version localStorage)
  const handleAddTodo = (newTodo) => {
    try {
      const todoToAdd = {
        id: Date.now(), // ID unique basé sur timestamp
        task: newTodo.task,
        completed: false,
        due_date: newTodo.due_date || null,
        created_at: new Date().toISOString()
      };
      
      setTodos([todoToAdd, ...todos]);
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'ajout');
    }
  };

  // Basculer complété/non complété
  const handleToggle = (id) => {
    try {
      setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
      setError('');
    } catch (err) {
      setError('Erreur lors de la modification');
    }
  };

  // Supprimer une tâche
  const handleDelete = (id) => {
    try {
      setTodos(todos.filter(todo => todo.id !== id));
      setError('');
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  // Optionnel : Effacer toutes les tâches
  const handleClearAll = () => {
    if (window.confirm('Supprimer toutes les tâches ?')) {
      setTodos([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header avec logo */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-2xl">✓</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">SmartTodo</h1>
              <p className="text-gray-600">Gestionnaire de tâches intelligent</p>
            </div>
          </div>
        </header>

        {/* Bouton tout effacer */}
        {todos.length > 0 && (
          <div className="text-right mb-4">
            <button 
              onClick={handleClearAll}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm"
            >
              🗑️ Tout effacer
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-blue-600">{todos.length}</p>
            <p className="text-gray-600">Total tâches</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-green-600">
              {todos.filter(t => t.completed).length}
            </p>
            <p className="text-gray-600">Terminées</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {todos.filter(t => !t.completed).length}
            </p>
            <p className="text-gray-600">En attente</p>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <AddTodoForm onAdd={handleAddTodo} />

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Liste des tâches */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📝 Mes Tâches</h2>
            <span className="text-sm text-gray-500">
              {todos.length} tâche{todos.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          {todos.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-xl mb-2">Pas encore de tâches</p>
              <p className="text-gray-400">Commence par ajouter ta première tâche ci-dessus</p>
            </div>
          ) : (
            <div>
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-500 text-sm">
          <p>✅ Frontend: React + Tailwind | Stockage: LocalStorage</p>
          <p className="mt-1">SmartTodo - © HURICES {new Date().getFullYear()}</p>
          <p className="mt-2 text-xs text-gray-400">
            Les données sont sauvegardées dans votre navigateur
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
