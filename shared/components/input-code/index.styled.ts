import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 20px;
`;

export const Inputs = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  input {
    border: none;
    background-image: none;
    background-color: transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    text-align: center;
    height: 60px;
    width: 40px;
    border-radius: 10px;
    margin: 0 4px;
    border: 2px solid #4f5b66;
    font-size: 38px;
    color: black;

    :focus {
      outline: none;
    }
  }
`;
