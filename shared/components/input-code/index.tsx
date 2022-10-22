import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useCallback,
} from "react";
import * as KEY from "consts/key-codes";
import * as Styled from "./index.styled";
import { DIGITS_ONLY } from "consts/regex";

type InputCodeProps = {
  length: number;
  loading?: boolean;
  onComplete: (code: string) => void;
};

const INPUTS_ID_COMMON_PART = "input-code";

export const InputCode = ({
  length,
  loading = false,
  onComplete,
}: InputCodeProps) => {
  const [inputsValues, setInputValues] = useState(
    [...Array(length)].map(() => "")
  );

  const changeInputFocus = (inputIndex: number) =>
    document.getElementById(`${INPUTS_ID_COMMON_PART}-${inputIndex}`)?.focus();

  const moveFocusToNextInput = useCallback(
    (inputIndex: number) => changeInputFocus(inputIndex + 1),
    []
  );

  const moveFocusToPrevInput = useCallback(
    (inputIndex: number) => changeInputFocus(inputIndex - 1),
    []
  );

  const onChange = useCallback(
    (inputIndex: number) =>
      ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        if (DIGITS_ONLY.test(value)) {
          const currentInputValues = [...inputsValues];
          const newValue = value.replace(currentInputValues[inputIndex], "");
          currentInputValues[inputIndex] = newValue;
          setInputValues(currentInputValues);

          if (inputIndex !== length) {
            moveFocusToNextInput(inputIndex);
          }

          const everyInputIsFilled = currentInputValues.every((digit) => digit);

          if (everyInputIsFilled && onComplete) {
            const code = currentInputValues.join("");
            onComplete(code);
          }
        }
      },
    [inputsValues, length, moveFocusToNextInput, onComplete]
  );

  const onKeyDown = useCallback(
    (inputIndex: number) =>
      ({ code }: KeyboardEvent<HTMLInputElement>) => {
        switch (code) {
          case KEY.BACKSPACE: {
            const currentInputValues = [...inputsValues];
            const index = currentInputValues[inputIndex]
              ? inputIndex
              : inputIndex - 1;
            currentInputValues[index] = "";
            setInputValues(currentInputValues);
            moveFocusToPrevInput(inputIndex);
            break;
          }
          case KEY.ARROW_RIGHT: {
            moveFocusToNextInput(inputIndex);
            break;
          }
          case KEY.ARROW_LEFT: {
            moveFocusToPrevInput(inputIndex);
            break;
          }
          default:
            break;
        }
      },
    [inputsValues, moveFocusToNextInput, moveFocusToPrevInput]
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
              maxLength={2}
              value={inputValue}
              readOnly={loading}
              onChange={onChange(index)}
              onKeyDown={onKeyDown(index)}
            />
          );
        })}
      </Styled.Inputs>
    </Styled.Container>
  );
};
