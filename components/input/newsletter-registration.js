import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
    const emailInputRef = useRef()

    function registrationHandler(event) {
    event.preventDefault();
    
    // fetch user input (state or refs)
    const enteredEmail = emailInputRef.current.value
    
    const reqBody = { email: enteredEmail}
      
    // optional: validate input
    

       fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
         'Content-Type':'application/json'
        }
  }).then(response => response.json()).then((data) => console.log(data))
    
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email' 
            id='email'
            ref={emailInputRef}
            placeholder='Your email'
            aria-label='Your email'
          />
          <button onClick={registrationHandler}>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;