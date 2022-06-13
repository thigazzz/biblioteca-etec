import styled from "styled-components";

interface ContainerProps {
    isConcluded: boolean;
    test: string;
}

export const Container = styled.tr<ContainerProps>`
    border-left: ${props => props.isConcluded ? `2.75rem solid ${props.theme.colors.background}` : '0px solid #000'} !important;

    transition: border-left .1s;

    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: large;
        cursor: pointer;

        &:hover {
            filter: brightness(0.9);
        }
    }

    .buttons.edit {
        padding: 5px;

        border-radius: 2px;

        color: #fff;
        background-color: ${({theme}) => theme.colors.yellow};

        font-size: small;

    }

    input {
        width: 100%;
        height: 100%;
        padding: 5px;

        font-size: medium;
    }
`