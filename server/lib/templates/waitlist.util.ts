const waitlistTemplate = () => {
  return `
  <div style="
    background-color: #fbf9f6;
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #1a1230;
  ">
    <div style="
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      padding: 36px 30px;
      box-shadow: 0 10px 30px rgba(15, 11, 30, 0.08);
      border: 1px solid rgba(155, 127, 212, 0.15);
    ">

      <!-- Header -->
      <h1 style="
        margin: 0 0 10px 0;
        font-size: 26px;
        font-weight: 600;
        color: #231848;
        text-align: center;
      ">
        Welcome to Oviya 🌸
      </h1>

      <p style="
        text-align: center;
        font-size: 14px;
        color: #6b4fa0;
        margin-bottom: 28px;
      ">
        You’re on the waitlist — and we’re really glad you’re here
      </p>

      <!-- Main Message -->
      <p style="
        font-size: 15px;
        line-height: 1.7;
        color: #1a1230;
        margin-bottom: 20px;
      ">
        Thank you for trusting us with something as personal as your health.  
        Oviya is being built with care — to help you better understand your body, feel more in control, and never feel alone in your journey.
      </p>

      <p style="
        font-size: 15px;
        line-height: 1.7;
        color: #1a1230;
        margin-bottom: 20px;
      ">
        We're taking our time to get this right. Every detail — from insights to reminders — is designed to be gentle, supportive, and actually useful in your daily life.
      </p>

      <!-- Early Access Highlight -->
      <div style="
        background: #f2eefb;
        border-radius: 12px;
        padding: 18px 16px;
        margin: 24px 0;
        border: 1px solid rgba(155, 127, 212, 0.2);
        text-align: center;
      ">
        <p style="
          margin: 0;
          font-size: 14px;
          color: #231848;
          font-weight: 500;
        ">
          You’re among the first to join Oviya — which means you’ll get early access as we begin rolling things out 💜
        </p>
      </div>

      <!-- Reassurance -->
      <p style="
        font-size: 14px;
        line-height: 1.6;
        color: #6b4fa0;
        text-align: center;
        margin-bottom: 24px;
      ">
        We’ll reach out as soon as your access is ready. Until then, take care of yourself — you’re doing better than you think.
      </p>

      <!-- Footer -->
      <div style="
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #9b7fd4;
      ">
        © ${new Date().getFullYear()} Oviya  
        <br/>
        Built with care, for you.
      </div>

    </div>
  </div>
  `;
};

export default waitlistTemplate;
