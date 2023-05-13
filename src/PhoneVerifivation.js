import React, { useState, useRef } from "react";
import "./PhoneVerification.css";

function PhoneVerification() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputsRef = useRef([]);

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 1); // Remove non-numeric characters and allow only one digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1].focus();
    } else if (!value && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text");
    const newOtp = pastedData.replace(/\D/g, "").slice(0, 6).split("");
    setOtp(newOtp.concat(Array(6 - newOtp.length).fill("")));

    // Move focus to last input
    otpInputsRef.current[5].focus();
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      otpInputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpInputsRef.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className="container">
      <button className="button" onClick={handleButtonClick}>
        Verify Phone
      </button>
      {isPopupOpen && (
        <div className="popup">
          <h2 className="title">Phone Verification</h2>
          <p className="subtitle">
            Enter the 6-digit OTP sent to your phone number:
          </p>
          <div className="otp-inputs">
            {otp.map((value, index) => (
              <input
                key={index}
                className="input"
                type="text"
                maxLength="1"
                value={value}
                ref={(el) => (otpInputsRef.current[index] = el)}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <button className="close-button" onClick={handleClosePopup}>
            Close
          </button>
          <button className="verify-button">
            Verify Phone Number
          </button>
        </div>
      )}
    </div>
  );
}

export default PhoneVerification;
