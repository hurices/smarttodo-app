import React, { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (task.trim() === '') {
      setError('Veuillez saisir une tâche');
      return;
    }
    
    // Validation date (pas dans le passé)
    if (dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
      setError('La date ne peut pas être dans le passé');
      return;
    }
    
    onAdd({
      task: task.trim(),
      due_date: dueDate || null
    });
    
    // Reset avec feedback visuel
    setTask('');
    setDueDate('');
    
    // Message de succès temporaire
    setTimeout(() => {
      const successMsg = document.querySelector('.success-message');
      if (successMsg) successMsg.remove();
    }, 2000);
  };

  // Date minimale (aujourd'hui)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Nouvelle tâche</h2>
          <p className="text-gray-500 text-sm">Ajoute une tâche à ta liste</p>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Champ tâche */}
        <div>
          <label htmlFor="task" className="block text-sm font-medium text-gray-700 mb-2">
            Description de la tâche *
          </label>
          <input
            id="task"
            type="text"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              setError('');
            }}
            placeholder="Ex: Préparer la présentation, Acheter du lait..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
            maxLength={200}
          />
          <div className="text-right mt-1 text-xs text-gray-400">
            {task.length}/200 caractères
          </div>
        </div>

        {/* Champ date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Date d'échéance (optionnel)
            </label>
            <div className="relative">
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={today}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bouton submit */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={!task.trim()}
              className={`w-full p-4 rounded-lg font-semibold transition-all ${
                task.trim()
                  ? 'bg-blue-600 hover:bg-blue-700 text-white transform hover:-translate-y-0.5'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Ajouter la tâche
              </div>
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
          💡 <strong>Astuce :</strong> Ajoute une date d'échéance pour prioriser tes tâches
        </div>
      </div>

      {/* Message de succès temporaire (ajouté via JS) */}
      <div className="success-message hidden">
        <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          ✅ Tâche ajoutée avec succès !
        </div>
      </div>
    </form>
  );
};

export default AddTodoForm;