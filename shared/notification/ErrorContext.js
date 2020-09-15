import React, {useCallback, useContext, useState} from 'react';

/**
 * Context per gestire gli errori globalmente
 * @type {React.Context<{addError: ErrorContext.addError, removeError: ErrorContext.removeError, error: null}>}
 */
export const ErrorContext = React.createContext({
  error: null,
  addError: () => {},
  removeError: () => {}
});


export default function ErrorContextProvider({ children }) {
  const [error, setError] = useState(null);

  const removeError = () => setError(null);
  const addError = (message, status) => setError({ message, status });

  const contextValue = {
    error,
    addError: useCallback((message, status) => addError(message, status), []),
    removeError: useCallback(() => removeError(), [])
  };


  return (

      <ErrorContext.Provider value={contextValue}>
        {children}
      </ErrorContext.Provider>
  )
}

export const useErrorContext = () => useContext(ErrorContext);


