import { useRef, useState } from "react";
import { BsCheckLg, BsHeart } from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

export default function Input({
  type = "text",
  disabled = false,
  hint = false,
  icon,
  label = "Label",
  required = false,
  error = false,
  color = "primary",
  placeholder = "Placeholder",
}) {
  const [isFocus, setIsFocus] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [inputValue, setInputValue] = useState("");
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

  return (
    <div className="w-96 flex flex-col gap-3">
      <div
        className={`${error ? "text-danger" : "text-blur"}
            ${isValid ? "text-success" : "text-blur"}
            ${isFocus ? `text-${color}` : "text-blur"}            
        font-nornal relative text-sm`}
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
        {icon === "heart" && (
          <BsHeart
            size={24}
            className={`${icon ? "text-dark absolute left-3" : "hidden"}`}
          />
        )}
        {icon === "lock" && (
          <CiLock
            size={24}
            className={`${icon ? "z-10 text-dark absolute left-3" : "hidden"}`}
          />
        )}

        <input
          ref={inputRef}
          type={type}
          defaultValue={type === "number" ? 0 : ""}
          value={inputValue}
          placeholder={type === "number" ? 0 : `${placeholder}`}
          className={`${icon ? "pl-12" : ""}
              ${isFocus ? `border-${color}` : "border-blur"}
              ${error ? "border-danger" : "border-blur"}
              ${isValid ? "border-success border-2" : "border-blur"}
              ${disabled ? "bg-disabled text-dark" : ""}
           border w-full p-3 rounded-lg placeholder:text-blur text-base`}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />

        <BsCheckLg
          size={22}
          className={`${
            isValid ? "rounded-full p-1 text-success absolute" : "hidden"
          }
              ${type === "text" ? "right-4" : "right-10"}
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
      {hint && type !== "password" && (
        <p
          className={`${error ? "text-danger" : "text-blur"}
            ${isValid ? "text-success" : "text-blur"}
          text-xs`}
        >
          {error ? "Something went wrong..." : "Helper text goes here"}
        </p>
      )}{" "}
      {hint && type === "password" && (
        <p className="text-blur text-xs">
          Password must be at least{" "}
          <span className="text-success">8 Characters</span> and must contain at
          least a <span className="text-success">Capital Letter</span>, a{" "}
          <span
            className={`${isValid ? "text-success" : ""}  ${
              error ? "text-danger" : ""
            }  ${isFocus ? "text-black" : ""}`}
          >
            Number
          </span>{" "}
          and a{" "}
          <span
            className={`${isValid ? "text-success" : ""} ${
              error ? "text-danger" : ""
            } ${isFocus ? "text-black" : ""}`}
          >
            Special Character
          </span>
        </p>
      )}
    </div>
  );
}
