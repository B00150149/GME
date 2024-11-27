import * as React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';
import '../styles/Style.css';

export default function About() {

    return (
        <>

            <Header />
            <h1>About</h1>
            <h2>Mission statement here*</h2>
            <h1>Contact Us</h1>

            <div class="container contact-form">
                <div className="contact-image">
                    <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact" style="display: block; margin: 0 auto; width: 70%;" />
                </div>
            </div>form id="contact-form" onSubmit={handleSubmit(onSubmit)} method="POST"</>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" rows="5"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </div>



          <Footer/>
          </>
    );}
    
}
