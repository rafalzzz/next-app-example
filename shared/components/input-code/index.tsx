import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import * as Styled from "./index.styled";

type InputCodeProps = {
  length: number;
  loading: boolean;
  onComplete: (code: string) => void;
};

//Logika do poprawy
export const InputCode = ({ length, loading, onComplete }: InputCodeProps) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef<HTMLInputElement[] | null>([]);

  console.log({ code });

  const processInput = (event: ChangeEvent<HTMLInputElement>, slot: number) => {
    console.log({ slot });

    const num = event.target.value;
    if (/[^0-9]/.test(num)) {
      return;
    }
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    console.log({ inputs: inputs.current });
    inputs.current?.[slot + 1].focus();
    if (newCode.every((num) => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>, slot: number) => {
    if (event.code === "Backspace" && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      if (inputs.current) {
        inputs.current[slot - 1].focus();
      }
    }
  };

  return (
    <Styled.Container>
      <Styled.Inputs>
        {code.map((num, idx) => {
          return (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={(event) => processInput(event, idx)}
              onKeyUp={(event) => onKeyUp(event, idx)}
              /* ref={(ref) => {
                if (inputs.current?.[idx]) {
                  inputs.current?.push(ref);
                }
              }} */
            />
          );
        })}
      </Styled.Inputs>
    </Styled.Container>
  );
};
