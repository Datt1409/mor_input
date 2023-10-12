import {
  isValidEmail,
  isValidNumber,
  isValidPassword,
  validateNumberInput,
} from "@/utils";
import { cloneElement, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

export default function Input({
  type = "text",
  disabled = false,
  hint,
  showIcon,
  label = "Label",
  required = false,
  color = "primaryBlue",
  placeholder = "Placeholder",
  className = "",
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [numberValue, setNumberValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef();

  const handleShowHide = () => {
    setIsFocus(true);
    if (hidePassword && inputRef.current) {
      setHidePassword(false);
      inputRef.current.type = "text";
    } else {
      setHidePassword(true);
      inputRef.current.type = "password";
    }
  };

  const handleIncrease = () => {
    if (isNaN(Number(inputRef.current.value))) return;
    setIsFocus(true);
    setNumberValue((prev) => (Number(prev) + 1).toString());
  };

  const handleDecrease = () => {
    if (isNaN(Number(inputRef.current.value))) return;
    setIsFocus(true);
    setNumberValue((prev) => (Number(prev) - 1).toString());
  };

  const handleChange = (event) => {
    const newInputValue = event.target.value;

    const validateInput = (value, validationFunction, errorMessage) => {
      if (!value && required) {
        setError(true);
        setErrorMessage("This field is required");
      } else if (value && !validationFunction(value)) {
        setError(true);
        setErrorMessage(errorMessage);
      } else {
        setError(false);
        setErrorMessage(null);
      }
    };

    if (!newInputValue && required) {
      setError(true);
      setErrorMessage("This field is required");
    } else {
      setError(false);
      setErrorMessage(null);
    }

    if (type === "email") {
      validateInput(newInputValue, isValidEmail, "Email is invalid");
    }

    if (type === "password") {
      validateInput(newInputValue, isValidPassword, "Invalid password");
    }

    if (type === "number") {
      const newNumberValue = event.target.value;

      if (!validateNumberInput(newNumberValue)) return;

      if (newNumberValue.startsWith("0")) {
        setNumberValue("");
      } else {
        validateInput(newNumberValue, isValidNumber, "Invalid number");
        setNumberValue(newNumberValue);
      }
    }
    setInputValue(newInputValue);
  };

  return (
    <div className={`w-96 flex flex-col gap-3 ${className}`}>
      {/* Label */}
      <div
        className={`${
          error
            ? "text-error font-bold"
            : isFocus
            ? `text-${color}`
            : !isFocus && !error && inputValue !== ""
            ? "text-dark font-bold"
            : ""
        } relative text-blur text-sm`}
      >
        {label}
        <span
          className={`${
            required ? "inline-block absolute text-red-600 ml-1" : "hidden"
          }`}
        >
          *
        </span>
      </div>

      {/* Input */}
      <div className="flex flex-row items-center w-full gap-3 relative">
        {showIcon &&
          cloneElement(showIcon.icon, {
            size: 24,
            className: "text-xs absolute left-3",
          })}
        <input
          ref={inputRef}
          type={type === "number" ? "text" : ""}
          value={type === "number" ? numberValue : inputValue}
          placeholder={type === "number" ? 0 : `${placeholder}`}
          className={`${showIcon ? "pl-12" : ""}
              ${
                error
                  ? "border-error border-3"
                  : isFocus
                  ? `border-${color} border-3`
                  : !isFocus && !error && inputValue !== ""
                  ? "border-dark border-2"
                  : ""
              }
              ${disabled ? "bg-disabled text-dark" : ""}
           border-2 w-full p-3 rounded-lg placeholder:text-blur text-base`}
          onChange={handleChange}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />

        {type === "password" && hidePassword ? (
          <VscEyeClosed
            size={23}
            className="absolute right-2 cursor-pointer"
            onClick={() => handleShowHide()}
          />
        ) : type === "password" && !hidePassword ? (
          <VscEye
            size={23}
            className="absolute right-2 cursor-pointer"
            onClick={handleShowHide}
          />
        ) : (
          <></>
        )}

        {type === "number" && (
          <div className="flex flex-col absolute right-2 cursor-pointer gap-1">
            <div
              className="text-[#83898C] bg-[#DDE2E5] flex items-center justify-center text-center w-10 border rounded-tl rounded-tr"
              onClick={handleIncrease}
            >
              <AiFillCaretUp size={16} />
            </div>
            <div
              className="text-[#83898C] bg-[#DDE2E5]  flex items-center text-center justify-center w-10 border rounded-bl rounded-br"
              onClick={handleDecrease}
            >
              <AiFillCaretDown size={16} />
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      <p className={`${errorMessage ? "text-error" : "hidden"}`}>
        {errorMessage}
      </p>

      {/* Hint */}
      {errorMessage ? (
        <></>
      ) : (
        <p className={`${error ? "text-error" : "text-blur"} text-xs`}>
          {hint}
        </p>
      )}
    </div>
  );
}
