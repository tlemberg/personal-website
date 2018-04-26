import * as React from 'react';
import './IntroText.css';

class IntroText extends React.Component {
  render() {
    const paragraphClassname = !this.props.daytime ? 'paragraph' : 'paragraph-daytime';
    const linkClassname = !this.props.daytime ? 'link' : 'link-daytime';
    return (
      <div className="container">
        <div className={paragraphClassname}>
          <span className="bold">Hello, I'm Tom Lemberg.</span> I'm the founder of <a href="https://curebase.com" className={linkClassname}>Curebase,</a> a decentralized clinical trial platform based in San Francisco, CA.
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