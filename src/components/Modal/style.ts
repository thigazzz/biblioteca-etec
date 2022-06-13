import styled from "styled-components";

export const Overlay = styled.div`
    position: absolute;
    
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    
    
    background-color: rgba(0,0,0,0.4);

    display: flex;
    justify-content: center;
    align-items: center;
`

export const Content = styled.div`
    width: 80%;

    padding: 20px;

    background-color: #fff;

    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    position: relative;

    .close-modal-button {
        position: absolute;
        
        top: 0;
        right: 0;

        margin: 10px;

        cursor: pointer;

        font-size: larger;
    }
`