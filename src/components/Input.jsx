import { isValidEmail, isValidNumber } from "@/utils";
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
    setNumberValue((prev) => (Number(prev) + 1).toString());
    setIsFocus(true);
  };

  const handleDecrease = () => {
    if (isNaN(Number(inputRef.current.value))) return;
    setNumberValue((prev) => (Number(prev) - 1).toString());
    setIsFocus(true);
  };

  const handleChange = (event) => {
    const newInputValue = event.target.value;
    console.log(event.target.value);

    if (newInputValue === "" && !required) {
      setError(false);
      setErrorMessage(null);
    } else if (newInputValue === "" && required) {
      setError(true);
      setErrorMessage("This field is required");
    } else if (newInputValue !== "") {
      setError(false);
      setErrorMessage(null);
    }

    if (type === "email") {
      if (isValidEmail(newInputValue)) {
        setError(false);
        setErrorMessage(null);
      } else if (!isValidEmail(newInputValue) && newInputValue !== "") {
        setError(true);
        setErrorMessage("Email is invalid");
      } else if (newInputValue === "" && !required) {
        setError(false);
        setErrorMessage(null);
      }
    }

    if (type === "number") {
      const newNumberValue = event.target.value;

      if (newNumberValue.startsWith("0")) {
        setNumberValue("");
        return;
      }
      if (!newNumberValue && required) {
        setError(true);
        setErrorMessage("This field is required");
      } else if (!newInputValue === "" && !required) {
        setError(false);
        setErrorMessage(null);
      } else {
        // Check if the value is a valid number
        if (isValidNumber(newInputValue)) {
          setError(false);
          setErrorMessage(null);
        } else if (!isValidNumber(newNumberValue)) {
          setError(true);
          setErrorMessage("Invalid number");
        }
      }

      setNumberValue(newNumberValue);
    }
    setInputValue(newInputValue);
  };

  return (
    <div className={`w-96 flex flex-col gap-3 ${className}`}>
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
      <p className={`${errorMessage ? "text-error font-bold" : "hidden"}`}>
        {errorMessage}
      </p>
      <p className={`${error ? "text-error" : "text-blur"} text-xs`}>{hint}</p>
    </div>
  );
}
