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
  const [showWelcome, setShowWelcome] = useState(false);
  const [filter, setFilter] = useState('all');

  // Sauvegarder automatiquement quand todos change
  useEffect(() => {
    localStorage.setItem('smarttodo-tasks', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('smarttodo-welcome-seen');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      localStorage.setItem('smarttodo-welcome-seen', 'true');
    }
  }, []);

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

  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = todos.length - completedCount;
  const progress = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl animate-pop">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-400 shadow-lg animate-float">
                  <span className="text-2xl">👋</span>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300/80">Bienvenue</p>
                  <h2 className="text-2xl font-semibold text-white">SmartTodo Pro</h2>
                </div>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 transition hover:bg-white/20"
              >
                Fermer
              </button>
            </div>
            <p className="text-sm text-white/70 mb-6">
              Organise ta journée avec une vue claire, des priorités visuelles et un espace dédié à la concentration.
              Profite des animations douces pour rester motivé.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">⚡️ Flux rapide</p>
                <p className="text-xs text-white/60 mt-2">Ajoute tes tâches en quelques secondes.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">🎯 Focus visuel</p>
                <p className="text-xs text-white/60 mt-2">Suis l’avancement et tes échéances.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Header */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 shadow-2xl mb-10">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_white,_transparent_65%)]" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-lg animate-float">
                ✓
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/70">SmartTodo</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white">Votre flow de tâches</h1>
                <p className="text-white/80 mt-2">Un tableau de bord épuré pour des listes ultra efficaces.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-wider text-white/80">
                Mode pro
              </span>
              <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-wider text-white/80">
                Animations fluides
              </span>
              <button
                onClick={() => setShowWelcome(true)}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs uppercase tracking-wider text-white/80 transition hover:bg-white/20"
              >
                👋 Bienvenue
              </button>
            </div>
          </div>
        </header>

        {/* Bouton tout effacer */}
        {todos.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-white/70">
              Tu as <span className="font-semibold text-white">{pendingCount}</span> tâche(s) à finaliser aujourd’hui.
            </div>
            <button 
              onClick={handleClearAll}
              className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-wider text-white/80 transition hover:bg-white/20"
            >
              🗑️ Tout effacer
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-lg backdrop-blur animate-fade-up">
            <p className="text-3xl font-bold text-white">{todos.length}</p>
            <p className="text-sm uppercase tracking-wider text-white/60">Total tâches</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-lg backdrop-blur animate-fade-up">
            <p className="text-3xl font-bold text-emerald-300">
              {completedCount}
            </p>
            <p className="text-sm uppercase tracking-wider text-white/60">Terminées</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-lg backdrop-blur animate-fade-up">
            <p className="text-3xl font-bold text-amber-300">
              {pendingCount}
            </p>
            <p className="text-sm uppercase tracking-wider text-white/60">En attente</p>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-wider text-white/60">Progression</p>
              <p className="text-2xl font-semibold text-white">{progress}%</p>
            </div>
            <div className="w-full max-w-sm">
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-white/50">
                {completedCount} terminée(s) • {pendingCount} en attente
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <AddTodoForm onAdd={handleAddTodo} />

        {/* Message d'erreur */}
        {error && (
          <div className="mb-4 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-red-100">
            {error}
          </div>
        )}

        {/* Liste des tâches */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">📝 Mes Tâches</h2>
              <p className="text-sm text-white/60">Planifie, coche et reste sur la bonne trajectoire.</p>
            </div>
            <span className="text-sm text-white/60">
              {filteredTodos.length} tâche{filteredTodos.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {[
              { key: 'all', label: 'Toutes' },
              { key: 'pending', label: 'En attente' },
              { key: 'completed', label: 'Terminées' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-wider transition ${
                  filter === tab.key
                    ? 'bg-white text-slate-900'
                    : 'border border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 text-white/70">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-xl mb-2">
                {todos.length === 0 ? 'Pas encore de tâches' : 'Aucune tâche dans ce filtre'}
              </p>
              <p className="text-white/50">
                {todos.length === 0
                  ? 'Commence par ajouter ta première tâche ci-dessus.'
                  : 'Change de filtre pour retrouver tes tâches.'}
              </p>
            </div>
          ) : (
            <div>
              {filteredTodos.map(todo => (
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
        <footer className="mt-10 text-center text-white/50 text-sm">
          <p>✅ Frontend: React + Tailwind | Stockage: LocalStorage</p>
          <p className="mt-1">SmartTodo - © HURICES {new Date().getFullYear()}</p>
          <p className="mt-2 text-xs text-white/40">
            Les données sont sauvegardées dans votre navigateur
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
