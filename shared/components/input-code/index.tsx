import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { INPUT_CODE_ID_COMMON_PART } from "consts/components-test-ids";
import * as KEY from "consts/key-codes";
import { DIGITS_ONLY } from "consts/regex";
import * as Styled from "./index.styled";

type InputCodeProps = {
  length: number;
  focusOnFirstInput?: boolean;
  onComplete: (code: string) => void;
  loading?: boolean;
  inputTestId?: string;
};

export const InputCode = ({
  length,
  onComplete,
  loading = false,
  focusOnFirstInput = false,
  inputTestId = "false",
}: InputCodeProps) => {
  const [inputsValues, setInputValues] = useState(
    [...Array(length)].map(() => "")
  );

  const changeInputFocus = (inputIndex: number) =>
    document
      .getElementById(`${INPUT_CODE_ID_COMMON_PART}-${inputIndex}`)
      ?.focus();

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

  useEffect(() => {
    document.getElementById(`${INPUT_CODE_ID_COMMON_PART}-0`)?.focus();
    if (focusOnFirstInput) {
    }
  }, [focusOnFirstInput]);

  return (
    <Styled.Container>
      <Styled.Inputs>
        {inputsValues.map((inputValue, index) => {
          return (
            <input
              key={index}
              id={`${INPUT_CODE_ID_COMMON_PART}-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={2}
              value={inputValue}
              readOnly={loading}
              onChange={onChange(index)}
              onKeyDown={onKeyDown(index)}
              data-testid={`${inputTestId}-${INPUT_CODE_ID_COMMON_PART}-${index}`}
            />
          );
        })}
      </Styled.Inputs>
    </Styled.Container>
  );
};
