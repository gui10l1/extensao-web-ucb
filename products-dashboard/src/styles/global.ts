import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;

    font-family: Arial, sans-serif;
  }

  button {
    background-color: transparent;
    font-weight: 600;
    border: 0;

    cursor: pointer;
  }
`;