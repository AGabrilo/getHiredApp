
import React, { useEffect } from "react";
import './landingPage.css';
import { NavBar } from "../../components";
import AOS from 'aos';
import 'aos/dist/aos.css';

function LandingPage() {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <>
      <NavBar />
      <section className='landing-section'>
        <div className="middle-section">
          <div className="landing-text" data-aos="flip-right" data-aos-duration="1200" data-aos-delay="400">
            <h1>Introducing GetHired app <br />
              Landing page</h1>
          </div>
          <div className="img" data-aos="flip-right" data-aos-duration="1200" data-aos-delay="400">
            <img className='landing-image' src={require("../../images/pic2.png")} alt="pic" width="600" height="400" />
          </div>
        </div>
      </section>

      <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className='test' fill="#fff" fillOpacity="1" d="M0,96L60,90.7C120,85,240,75,360,90.7C480,107,600,149,720,165.3C840,181,960,171,1080,138.7C1200,107,1320,53,1380,26.7L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>

      <section>
        <div className="about-section">
          <div className="img" data-aos="fade-left" data-aos-duration="1200">
            <img className='about-image' src={require('../../images/pic.jpg')} alt="pic" width="680" height="680" />
          </div>
          <div className='about-text' data-aos="fade-right" data-aos-duration="1200">
            <span className="circle" data-aos="fade-right" data-aos-duration="1200">1000+ jobs</span>
            <h1 className='about-header' data-aos="fade-right" data-aos-duration="1200">About us</h1>
            <b className='about-subheader' data-aos="fade-right" data-aos-duration="1200">Web application for finding/posting jobs</b>
            <p className='about-paragraph' data-aos="fade-right" data-aos-duration="1200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </section>

      <section className="hiring">
        <div className="container">
          <div className="section-header" data-aos="fade-up" data-aos-duration="1200">
            <h2>Sign up for free</h2>
          </div>
          <div className="hiring-items">
            <div className="hiring-item">
              <img className='hiring-image' data-aos="fade-right" data-aos-duration="1200" src={require("../../images/two.jpg")} alt="pic" width="570" height="490" />
              <div className="hiring-info" data-aos="fade-right" data-aos-duration="1200">
                <h3>Build your resume</h3>
                <div className="info">Build</div>
              </div>
            </div>
            <div className="hiring-item">
              <img className='hiring-image' data-aos="fade-right" data-aos-duration="1200" src={require("../../images/three.jpeg")} alt="pic" width="570" height="490" />
              <div className="hiring-info" data-aos="fade-right" data-aos-duration="1200">
                <h3 className="hiring-backdrop">Search for a job</h3>
                <div className="info">Search</div>
              </div>
            </div>
            <div className="hiring-item">
              <img className='hiring-image' data-aos="fade-right" data-aos-duration="1200" src={require("../../images/four.jpg")} alt="pic" width="570" height="490" />
              <div className="hiring-info" data-aos="fade-right" data-aos-duration="1200">
                <h3>Apply for a job</h3>
                <div className="info">Apply</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hiring">
        <div className="container">
          <div className="section-header" data-aos="fade-up" data-aos-duration="1200">
            <h2>We offer you...</h2>
          </div>
          <div className="offer-items">
            <div className="offer-item">
              <img className='about-image' data-aos="fade-right" data-aos-duration="1200" src={require('../../images/pic.jpg')} alt="pic" width="200" height="200" />
              <div className="offer-info" data-aos="fade-up" data-aos-duration="1200">
                First offer
              </div>
            </div>
            <div className="offer-item">
              <img className='about-image' data-aos="fade-right" data-aos-duration="1200" src={require('../../images/pic.jpg')} alt="pic" width="200" height="200" />
              <div className="offer-info" data-aos="fade-up" data-aos-duration="1200">
                Second offer
              </div>
            </div>
            <div className="offer-item">
              <img className='about-image' data-aos="fade-right" data-aos-duration="1200" src={require('../../images/pic.jpg')} alt="pic" width="200" height="200" />
              <div className="offer-info" data-aos="fade-up" data-aos-duration="1200">
                Third offer
              </div>
            </div>
            <div className="offer-item">
              <img className='about-image' data-aos="fade-right" data-aos-duration="1200" src={require('../../images/pic.jpg')} alt="pic" width="200" height="200" />
              <div className="offer-info" data-aos="fade-up" data-aos-duration="1200">
                Fourth offer
              </div>
            </div>
            <div className="offer-item">
              <img className='about-image' data-aos="fade-right" data-aos-duration="1200" src={require('../../images/pic.jpg')} alt="pic" width="200" height="200" />
              <div className="offer-info" data-aos="fade-up" data-aos-duration="1200">
                Fifth offer
              </div>
            </div>
          </div>
        </div>
      </section>

      <svg className="wave-end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path className='test' fill="#f7e947" fillOpacity="1" d="M0,96L60,90.7C120,85,240,75,360,90.7C480,107,600,149,720,165.3C840,181,960,171,1080,138.7C1200,107,1320,53,1380,26.7L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>

    </>

  );
}

export default LandingPage;