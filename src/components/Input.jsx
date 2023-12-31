import {
  isValidEmail,
  isValidNumber,
  isValidPassword,
  validateNumberInput,
} from "@/utils";
import { cloneElement, useEffect, useMemo, useRef, useState } from "react";
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
  const [numberValue, setNumberValue] = useState("0");
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef();
  const inputContainerRef = useRef();
  const labelRef = useRef();

  const statusClassName = useMemo(() => {
    if (error) {
      return "border-error";
    }
    if (isFocus) {
      return `border-${color}`;
    }

    if (!!inputValue || !!+numberValue) {
      return "border-dark border-2";
    }
    return "";
  }, [error, isFocus, inputValue, color, numberValue]);

  const labelStatusClassName = useMemo(() => {
    if (error) {
      return "text-error";
    }
    if (isFocus) {
      return `text-${color}`;
    }
    if (!!inputValue || !!+numberValue) {
      return "text-dark";
    }
    return "";
  }, [error, isFocus, inputValue, color, numberValue]);

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
    console.log(numberValue);
    setIsFocus(true);
    if (!inputRef.current.value && required) {
      setNumberValue("1");
      // console.log(numberValue);
      setError(false);
      setErrorMessage(null);
      return;
    }
    if (
      !isNaN(Number(inputRef.current.value)) &&
      isFinite(Number(inputRef.current.value))
    ) {
      setNumberValue((prev) => (Number(prev) + 1).toString());
      setError(false);
      setErrorMessage(null);
    }
  };

  const handleDecrease = () => {
    setIsFocus(true);
    if (!inputRef.current.value && required) {
      setNumberValue("-1");
      setError(false);
      setErrorMessage(null);
      return;
    }
    if (
      !isNaN(Number(inputRef.current.value)) &&
      isFinite(Number(inputRef.current.value))
    ) {
      setNumberValue((prev) => (Number(prev) - 1).toString());
      setError(false);
      setErrorMessage(null);
    }
  };

  const handleBlur = () => {
    setIsFocus(false);
    if ((!isFocus && required && !inputValue) || !+numberValue) {
      inputRef.current.style.border = "2px solid #f57e77";
      labelRef.current.style.color = "#f57e77";
      setError(true);
      setErrorMessage("This field is required");
    }
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

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(e.target) &&
        e.target !== labelRef.current
      ) {
        setIsFocus(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div className={`w-96 flex flex-col gap-3 ${className}`}>
      {/* Label */}
      <div
        ref={labelRef}
        className={`${labelStatusClassName} relative text-blur text-sm cursor-pointer`}
        onClick={() => {
          if (!disabled) {
            setIsFocus(true);
            inputRef.current?.focus();
          }
        }}
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
      <div
        ref={inputContainerRef}
        className="flex flex-row items-center w-full gap-3 relative"
      >
        {showIcon &&
          cloneElement(showIcon.icon, {
            size: 24,
            className: "text-xs absolute left-3",
          })}
        <input
          ref={inputRef}
          type={type === "number" ? "text" : `${type}`}
          value={type === "number" ? numberValue : inputValue}
          placeholder={
            type === "number" ? "0" : disabled ? "" : `${placeholder}`
          }
          className={`${showIcon ? "pl-11" : "pl-3"}
              ${statusClassName}
              ${disabled ? "bg-disabled text-dark" : ""}
           border-2 w-full py-3 pr-14 overflow-hidden rounded-lg placeholder:text-blur text-base`}
          onChange={handleChange}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={() => handleBlur()}
        />

        {type === "password" &&
          (hidePassword ? (
            <VscEyeClosed
              size={23}
              className="absolute right-2 cursor-pointer"
              onClick={handleShowHide}
            />
          ) : (
            <VscEye
              size={23}
              className="absolute right-2 cursor-pointer"
              onClick={handleShowHide}
            />
          ))}

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

      {errorMessage ? (
        <p
          className={`text-${
            type === "password" && error ? "error" : "error"
          } text-xs`}
        >
          {type === "password" ? hint : errorMessage}
        </p>
      ) : (
        <p className={`text-${error ? "error" : "blur"} text-xs`}>{hint}</p>
      )}
    </div>
  );
}
