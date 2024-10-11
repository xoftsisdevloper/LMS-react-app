import React from 'react';
import { Helmet } from 'react-helmet'; // Use Helmet for managing head tags
import './home.css'

const Home = () => {
  const name = "Cleaning Service";
  const website = "cleaningservice.com";

  return (
    <>
      {/* Use Helmet for managing meta tags and other head-related content */}
      <Helmet>
        <title>Cleaning Service</title>
        <meta charset="UTF-8" />
        <meta name="language" content="ES" />
        <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Helmet>

      <main className="flex">
        <section className="flex-content padding_2x">
          <article>
            <em className="tag">WEBSITE NAME</em>
            <h1 className="title big">
              Best <em>Commercial & Residential</em> Cleaning Service.
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
            <a href="#" className="btn1">
              Book a service <i className="fa fa-arrow-right"></i>
            </a>
          </article>
        </section>
        <section className="flex-content padding_2x"></section>
      </main>

      <div className="section1">
        <section className="flex-content padding_2x">
          <em className="tag">ABOUT US</em>
          <h1 className="title medium">We help you to keep your place clean</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
          </p>
        </section>
        <section className="flex-content padding_2x">
          <form id="form" className="padding_2x">
            <h2 className="small">Book a service</h2>
            <fieldset>
              <label htmlFor="fname">Your name</label>
              <input type="text" name="fname" id="fname" maxLength="60" />
            </fieldset>
            <fieldset>
              <label htmlFor="cno">Contact number</label>
              <input type="tel" name="cno" maxLength="15" />
            </fieldset>
            <fieldset>
              <label htmlFor="zip">Zip code</label>
              <input type="tel" name="zip" maxLength="8" />
            </fieldset>
            <fieldset>
              <label htmlFor="service">Choose a service</label>
              <select name="service" id="service">
                <option value="1">Residential Cleaning</option>
                <option value="2">Commercial Cleaning</option>
                <option value="3">Other</option>
              </select>
            </fieldset>
            <fieldset>
              <button id="form_btn" className="btn2">SUBMIT DETAILS</button>
            </fieldset>
          </form>
        </section>
      </div>

      <div className="sections section2 padding_2x">
        {/* Section 2 with service cards */}
      </div>

      <div className="section4 flex">
        <section className="flex-content padding_2x">
          <figure>
            <img src="https://i.postimg.cc/YSnXb0HL/05.jpg" alt="" />
            <span className="padding_1x">
              <p className="title medium">5+</p>
              <em>Years of experience</em>
            </span>
          </figure>
        </section>
        <section className="flex-content padding_2x">
          <em className="tag">WHY CHOOSE US?</em>
          <h1 className="title medium">We provide the best services for your help!</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
        </section>
      </div>

      <footer>
        <section className="flex-content padding_2x">
          <h3 className="title small">Welcome to <em>{name}</em></h3>
          <p>Lorem Ipsum is simply dummy text of the printing industry...</p>
          <span className="social_icons">
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-youtube"></i></a>
          </span>
        </section>

        {/* Add more sections as needed */}
      </footer>

      <div className="sub_footer">
        <p>2024 © All rights reserved by {website}</p>
      </div>
    </>
  );
};

export default Home;
