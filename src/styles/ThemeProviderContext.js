import React, {useContext, useState, createContext} from 'react';
import { Themes } from './themes';

const ThemeContext = createContext({});

export const ThemeContextProvider = (props) => {
   const [theme, setTheme] =  useState(Themes.primaryTheme);

   return (
       <ThemeContext.Provider value={{theme: theme, setTheme: setTheme}}>
          {props.children} 
       </ThemeContext.Provider>
   )
}

export function useTheme(Component) {
   
    return props => {
        const {theme, setTheme} = useContext(ThemeContext);
        const updateTheme = theme => {
            setTheme(theme)
        }
        return <Component {...props} theme={theme} setTheme={updateTheme} />
    }
}