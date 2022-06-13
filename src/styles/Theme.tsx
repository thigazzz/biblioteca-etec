import { ReactNode } from 'react';
import {ThemeProvider} from 'styled-components';

interface ThemeProps {
    children: ReactNode
}


export const Theme = ({children}: ThemeProps) => {
    const theme = {
        colors: {
            background: '#4D4D4F',
            mainColor: '#B20000',
            green: '#59A96A',
            yellow: '#F8C630'
        }
    }
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}