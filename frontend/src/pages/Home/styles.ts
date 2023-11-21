import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  border-bottom: 1px solid #e1e1e1;
  box-shadow: 0 0 5px #e1e1e1;

  padding: 10px 20px;

  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    max-width: 50px;
    height: auto;
  }

  a {
    color: #141414;
    font-size: 18px;
    text-decoration: none;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;

    button {
      color: #141414;
      font-size: 18px;

      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      font-weight: 700;
    }
  }
`;

export const Main = styled.main`
  margin: 20px 0;
  padding: 0 20px;
`;

export const Footer = styled.footer`
  > button {
    height: 44px;

    background-color: green;
    color: #fff;

    border-radius: 4px;

    padding: 0 10px;
    margin: 0 auto;

    display: block;
  }

  > form {
    display: flex;
    align-items: center;
    
    gap: 5px;

    max-width: 90%;
    margin: 0 auto;

    flex-wrap: wrap;

    > input {
      border-radius: 4px;

      font-size: 18px;

      padding: 10px 5px;

      border: 1px solid #e1e1e1;

      flex: 1;

      &[type="number"] {
        max-width: 115px;
      }

      &::placeholder {
        font-size: 18px;
        color: #ccc;
      }
    }

    > button {
      padding: 10px 5px;

      max-width: max-content;
      border-radius: 4px;

      &[type="button"] {
        background-color: red;
        color: #fff;
      }

      &[type="submit"] {
        background-color: green;
        color: #fff;
      }
    }
  }
`;

export const TableAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  button {
    width: 40px;
    height: 40px;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .danger {
    background-color: red;
  }

  .warning {
    background-color: gold;
  }
`;
