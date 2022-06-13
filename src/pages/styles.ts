import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  position: relative;

  header {
    width: 100%;
    height: 8vh;

    background-color: ${({ theme }) => theme.colors.background};
    color: #fff;

    .toggle-button {
      font-size: x-large;
      cursor: pointer;
    }

    .center {
      width: 80%;
      height: 100%;

      margin: 0 auto;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .menu {
        width: 0;
        display: none;

        transition: width .5s ;

        z-index: 999;

        .close-menu {
          font-size: x-large;
          align-self: flex-end;
          margin: 18px;
          cursor: pointer;
        }
      }
      .menu.active {
        position: absolute;

        display: flex;

        align-items: center;
        flex-direction: column;

        top: 0;
        right: 0;

        width: 40%;
        height: 100%;

        background-color: ${({ theme }) => theme.colors.background};

        .content {
          width: 100%;
          height: 40%;
          display: flex;
          align-items: center;
          flex-direction: column;

          a {
            width: 90%;
            height: 4.75rem;

            padding: 1.25rem;

            text-decoration: none;

            background-color: ${({ theme }) => theme.colors.mainColor};

            color: #fff;

            border-radius: 4px;

            display: flex;
            align-items: center;
            justify-content: start;

            transition: filter .2s;

            & + a {
              margin-top: 10px;
            }

            &:hover {
                filter: brightness(0.9);
            }
          }
        }
      }
    }
  }
`;
