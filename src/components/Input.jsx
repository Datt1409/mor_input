import { isValidEmail } from "@/utils";
import { cloneElement, useRef, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

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
  const [isValid, setIsValid] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [numberValue, setNumberValue] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const inputRef = useRef();

  const handleShowHide = () => {
    if (hidePassword && inputRef.current) {
      setHidePassword(false);
      inputRef.current.type = "text";
    } else {
      setHidePassword(true);
      inputRef.current.type = "password";
    }
  };

  const handleChange = (event) => {
    const newInputValue = event.target.value;

    if (type !== "number") {
      if (newInputValue === "" && !required) {
        setIsValid(false);
        setError(false);
        setErrorMessage(null);
      } else if (newInputValue === "" && required) {
        setIsValid(false);
        setError(true);
        setErrorMessage("This field is required");
      } else if (newInputValue !== "") {
        setIsValid(true);
        setError(false);
        setErrorMessage(null);
      }
    }
    if (type === "email") {
      if (isValidEmail(newInputValue)) {
        setIsValid(true);
        setError(false);
        setErrorMessage(null);
      } else if (!isValidEmail(newInputValue)) {
        setError(true);
        setErrorMessage("Email is invalid");
      }
    }

    if (type === "number") {
      const newNumberValue = Number(event.target.value);
      newNumberValue !== 0 ? setIsValid(true) : setIsValid(false);

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
            : isFocus && !isValid
            ? `text-primaryBlue`
            : isValid && isFocus
            ? "text-success"
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
          type={type}
          value={type === "number" ? numberValue : inputValue}
          placeholder={type === "number" ? 0 : `${placeholder}`}
          className={`${showIcon ? "pl-12" : ""}
              ${
                isFocus && !isValid
                  ? `border-${color} border-3`
                  : isFocus && isValid
                  ? "!border-success"
                  : error
                  ? "border-error border-3"
                  : "border-blur"
              }
              ${disabled ? "bg-disabled text-dark" : ""}
           border-2 w-full p-3 rounded-lg placeholder:text-blur text-base`}
          onChange={handleChange}
          disabled={disabled}
          onFocus={() => {
            setIsFocus(true);
            console.log("isFocus", isFocus);
            console.log("isValid", isValid);
          }}
          onBlur={() => setIsFocus(false)}
        />

        <BsCheckLg
          size={22}
          className={`${
            isValid && isFocus && !error
              ? "rounded-full p-1 text-success absolute"
              : "hidden"
          }
              ${type === "text" || type === "email" ? "right-4" : "right-10"}
            `}
          style={{ background: "rgba(50, 147, 111, 0.24)" }}
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
            onClick={() => handleShowHide()}
          />
        ) : (
          <></>
        )}
      </div>
      <p className={`${errorMessage ? "text-error font-bold" : "hidden"}`}>
        {errorMessage}
      </p>
      <p className={`${error ? "text-error" : "text-blur"} text-xs`}>{hint}</p>
    </div>
  );
}
