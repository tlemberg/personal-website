import * as React from 'react';
import './IntroText.css';

class IntroText extends React.Component {
  render() {
    const paragraphClassname = !this.props.daytime ? 'paragraph' : 'paragraph-daytime';
    const linkClassname = !this.props.daytime ? 'link' : 'link-daytime';
    console.log(paragraphClassname);
    return (
      <div className="container">
        <div className={paragraphClassname}>
          <span className="bold">Hello, I'm Tom Lemberg.</span> I'm the founder of <a href="https://curebase.com" className={linkClassname}>Curebase,</a> a decentralized clinical trial platform based in <a href="https://www.google.com/maps/place/The+UPS+Store/@37.7386672,-122.4708922,17z/data=!4m12!1m6!3m5!1s0x808f7deaba93c73d:0x74b3def49d38ddc9!2sThe+UPS+Store!8m2!3d37.738663!4d-122.4686982!3m4!1s0x808f7deaba93c73d:0x74b3def49d38ddc9!8m2!3d37.738663!4d-122.4686982" className={linkClassname}>San Francisco, CA.</a>
        </div>
        <div className={paragraphClassname}>
          Before Curebase I was a product manager at <a href="https://syapse.com" className={linkClassname}>Syapse</a>, a precision medicine platform in oncology, and a software engineer at Athenahealth and Amazon.
        </div>
        <div className={paragraphClassname}>
          At Harvard I did <a href="https://drive.google.com/open?id=0BwBgCatFvKJfQmZtb295djNJNjA" className={linkClassname}>bioinformatics research</a> applying AI to epigenetics. I lived in Leverett House and played club squash.
        </div>
        <div className={paragraphClassname}>
          I am still learning how to <a href="https://twitter.com/tom_lemberg" className={linkClassname}>tweet</a>, but I'm slightly more talented at using <a href="https://www.linkedin.com/in/tom-lemberg-3270a426/" className={linkClassname}>LinkedIn</a> and <a href="https://github.com/tlemberg" className={linkClassname}>GitHub.</a>
        </div>
      </div>
    );
  }
}

export default IntroText;