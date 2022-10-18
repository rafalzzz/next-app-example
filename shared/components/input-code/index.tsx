import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useCallback,
} from "react";
import * as Styled from "./index.styled";

type InputCodeProps = {
  length: number;
  loading: boolean;
  onComplete: (code: string) => void;
};

const INPUTS_ID_COMMON_PART = "input-code";

export const InputCode = ({ length, loading, onComplete }: InputCodeProps) => {
  const [inputsValues, setInputValues] = useState(
    [...Array(length)].map(() => "")
  );

  const changeInputFocus = (inputIndex: number) =>
    document.getElementById(`${INPUTS_ID_COMMON_PART}-${inputIndex}`)?.focus();

  const processInput = useCallback(
    (
      { target: { value } }: ChangeEvent<HTMLInputElement>,
      inputIndex: number
    ) => {
      if (/^\d+$/.test(value)) {
        const currentInputValues = [...inputsValues];
        currentInputValues[inputIndex] = value;
        setInputValues(currentInputValues);

        if (inputIndex !== length) {
          const nextInputIndex = inputIndex + 1;
          changeInputFocus(nextInputIndex);
        }

        const everyInputIsFilled = currentInputValues.every((digit) => digit);

        if (everyInputIsFilled && onComplete) {
          const code = currentInputValues.join("");
          onComplete(code);
        }
      }
    },
    [inputsValues, length, onComplete]
  );

  const onKeyUp = useCallback(
    ({ code }: KeyboardEvent<HTMLInputElement>, inputIndex: number) => {
      if (code === "Backspace") {
        const currentInputValues = [...inputsValues];
        currentInputValues[inputIndex] = "";
        const prevInputIndex = inputIndex - 1;
        setInputValues(currentInputValues);
        changeInputFocus(prevInputIndex);
      }
    },
    [inputsValues]
  );

  return (
    <Styled.Container>
      <Styled.Inputs>
        {inputsValues.map((inputValue, index) => {
          return (
            <input
              key={index}
              id={`${INPUTS_ID_COMMON_PART}-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={inputValue}
              readOnly={loading}
              onChange={(event) => processInput(event, index)}
              onKeyUp={(event) => onKeyUp(event, index)}
            />
          );
        })}
      </Styled.Inputs>
    </Styled.Container>
  );
};
