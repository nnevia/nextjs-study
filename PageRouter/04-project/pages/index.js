import { useRef, useState } from 'react';

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const [feedbackItems, setfeedbackItems] = useState([]);

  function submitFormHandler(event) {
    event.preventDefault();

    const enterEmail = emailInputRef.current.value;
    const enterFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enterEmail, text: enterFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler(event) {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setfeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>

        <div>
          <label htmlFor="feedback">Your Feedback </label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((feedbackItem) => (
          <li key={feedbackItem.id}>
            {feedbackItem.email}
            <br />

            {feedbackItem.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
