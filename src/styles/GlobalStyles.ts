import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93,75%;
        }
        @media (max-width: 720px) {
            font-size: 87,5%;
        }
    }   
    
    body {
        background-color: var(--background);
        --webkit-font-smoothing: antialiased;

        width: 100%;
        height: 100vh;

        #root {
            width: 100%;
            height: 100vh;
        }
    }

    body, 
    input,
    textarea,
    button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }    
    
    h1, 
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 600;
    }


    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;;
        cursor: not-allowed;
    }
`