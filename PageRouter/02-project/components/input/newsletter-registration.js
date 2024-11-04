import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const NotificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const enterEmail = emailInputRef.current.value;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   alert('유효한 이메일 주소를 입력하세요.');
    //   emailInputRef.current.value = '';

    //   return; // 유효하지 않은 경우 제출 중단
    // }
    const reqBody = { email: enterEmail };

    NotificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong !');
        });
      })
      .then((data) => {
        NotificationCtx.showNotification({
          title: 'Success !',
          message: 'Sucessfully registered for newsletter!',
          status: 'success',
        });
        emailInputRef.current.value = '';
      })
      .catch((error) => {
        NotificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
