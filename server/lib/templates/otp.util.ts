const otpTemplate = (otp: string) => {
  return `
  <div style="
    background-color: #fbf9f6;
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1a1230;
  ">
    <div style="
      max-width: 480px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      padding: 32px 28px;
      box-shadow: 0 10px 30px rgba(15, 11, 30, 0.08);
      border: 1px solid rgba(155, 127, 212, 0.15);
    ">
      
      <!-- Header -->
      <h1 style="
        margin: 0 0 8px 0;
        font-size: 24px;
        font-weight: 600;
        color: #231848;
        text-align: center;
      ">
        Oviya
      </h1>

      <p style="
        text-align: center;
        font-size: 14px;
        color: #6b4fa0;
        margin-bottom: 24px;
      ">
        Secure access to your account
      </p>

      <!-- Message -->
      <p style="
        font-size: 15px;
        line-height: 1.6;
        color: #1a1230;
        margin-bottom: 24px;
        text-align: center;
      ">
        You're trying to sign in or create your account.  
        Please use the verification code below to continue.
      </p>

      <!-- OTP Box -->
      <div style="
        text-align: center;
        margin: 28px 0;
      ">
        <span style="
          display: inline-block;
          background: #f2eefb;
          color: #231848;
          font-size: 28px;
          letter-spacing: 6px;
          padding: 14px 22px;
          border-radius: 12px;
          border: 1px solid rgba(155, 127, 212, 0.2);
          font-weight: 600;
        ">
          ${otp}
        </span>
      </div>

      <!-- Expiry -->
      <p style="
        font-size: 13px;
        color: #6b4fa0;
        text-align: center;
        margin-bottom: 24px;
      ">
        This code is valid for <strong>5 minutes</strong>.
      </p>

      <!-- Warning -->
      <p style="
        font-size: 12px;
        color: #9b7fd4;
        text-align: center;
        line-height: 1.5;
      ">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <!-- Footer -->
      <div style="
        margin-top: 32px;
        text-align: center;
        font-size: 12px;
        color: #9b7fd4;
      ">
        © ${new Date().getFullYear()} Oviya
      </div>
    </div>
  </div>
  `;
};

export default otpTemplate;
