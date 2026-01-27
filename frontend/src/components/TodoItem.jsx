import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 mb-3 rounded-lg shadow transition-all duration-200 ${
        todo.completed 
          ? 'bg-green-50 border-l-4 border-green-500' 
          : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center flex-grow">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all ${
            todo.completed 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-blue-500'
          }`}
          aria-label={todo.completed ? "Marquer comme non complété" : "Marquer comme complété"}
        >
          {todo.completed && (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        
        <div className="flex-grow">
          <span 
            className={`text-lg font-medium ${
              todo.completed 
                ? 'line-through text-gray-500' 
                : 'text-gray-800'
            }`}
          >
            {todo.task}
          </span>
          
          {todo.due_date && (
            <div className="flex items-center mt-1">
              <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-500">
                {new Date(todo.due_date).toLocaleDateString('fr-FR', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}
          
          <div className="flex items-center mt-2">
            <span className={`text-xs px-2 py-1 rounded ${
              todo.completed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {todo.completed ? 'Terminée' : 'En cours'}
            </span>
            <span className="text-xs text-gray-400 ml-3">
              Créé le {new Date(todo.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 ml-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        aria-label="Supprimer la tâche"
        title="Supprimer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;