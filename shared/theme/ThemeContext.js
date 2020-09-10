import React, { useContext } from 'react';

const ThemeContext = React.createContext({});

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
