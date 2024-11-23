import React from "react";
import styled from "styled-components";

const Button = ({ btnName, type = "button", disabled = false }) => {
  return (
    <Container>
      <button
        disabled={disabled}
        className={`btn ${disabled ? "btnDisabled" : ""}`}
        type={type}
      >
        {btnName}
      </button>
    </Container>
  );
};

export default Button;

const Container = styled.div`
  .btn {
    display: block;
    margin: auto;
    text-align: center;
    padding: 10px 0;
    width: 130px !important;
    height: 48px !important;
    border-radius: 30px;
    outline: none;
    background: transparent;
    border: 1px solid #041434;
    font-size: 18px;
    color: #041434;
    text-transform: capitalize;
    text-decoration: none;

    cursor: pointer;
  }

  .btnDisabled {
    cursor: not-allowed;
  }
`;
