import styled from 'styled-components';

export const Container = styled.div`
  max-width: 550px;
  width: 100%;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  border: 1px solid #e1e1e1;

  box-shadow: 0 0 5px #e1e1e1;

  border-radius: 8px;

  padding: 20px;

  > h1 {
    font-size: 24px;
    color: #151515;

    text-align: center;

    border-bottom: 1px solid rgba(0, 0, 0, .5);

    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  > form {
    display: flex;
    flex-direction: column;
    gap: 8px;

    > div {
      display: flex;
      flex-direction: column;

      > label {
        margin-bottom: 4px;
      }
    }

    input {
      height: 30px;

      font-size: 18px;

      padding: 0 4px;

      border: 2px solid #151515;
      border-radius: 4px;
    }

    button {
      width: 100%;
      height: 40px;

      background-color: green;
      color: #fff;

      font-size: 18px;
      border-radius: 4px;

      cursor: pointer;

      margin-top: 20px;
    }
  }

  .link-wrapper {
    text-align: center;

    margin-top: 10px;
  }
`;