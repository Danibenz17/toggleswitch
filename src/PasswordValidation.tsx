import { useState } from "react";

const PasswordValidator = () => {
  const [password, setPassword] = useState("");
  const [validation, setvalidation] = useState({
    haslowercase: false,
    hasuppercase: false,
    hasnumber: false,
    hasValidLength: false,
  });
  const validPassword = (value: string) => {
    const haslowercase = /[a-z]/.test(value);
    const hasuppercase = /[A-Z]/.test(value);
    const hasnumber = /[0-9]/.test(value);
    const hasValidLength = value.length >= 8;

    setvalidation({
      haslowercase,
      hasnumber,
      hasuppercase,
      hasValidLength,
    });
  };

  const handlechange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setPassword(value);
    validPassword(value);
  };
  return (
    <div>
      <input type="password" value={password} onChange={handlechange}></input>
      <div>Password should Contain the following:</div>
      <p className={validation.haslowercase ? "valid-rule" : "invalid-rule"}>
        Password should contain atleast one lowercase
      </p>
      <p className={validation.hasuppercase ? "valid-rule" : "invalid-rule"}>
        Password should contain atleast one uppercase
      </p>
      <p className={validation.hasnumber ? "valid-rule" : "invalid-rule"}>
        Password should contain atleast one number
      </p>
      <p className={validation.hasValidLength ? "valid-rule" : "invalid-rule"}>
        Password should contain atleast 8 characters
      </p>
      <button type="submit">
        Submit
      </button>
    </div>
  );
};

export default PasswordValidator;
