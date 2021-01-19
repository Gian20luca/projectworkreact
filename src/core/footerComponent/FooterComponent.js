import React from "react";

export function FooterComponent() {
  return (

    <footer
      className="section footer-classNameic context-dark bg-image"
      style={{background: " #002699"}}
    >
      <div className="container-fluid">
        <div className="row row-30">
          <div className="col-sm-12 col-md-3 col-xl-3">
            <div className="pr-xl-3">
              <a className="brand" href="https://www.linksmt.it/"
              ><img
                  className="brand-logo-light"
                  src="https://media-exp1.licdn.com/dms/image/C4D0BAQGJ2Iy-CgIfHA/company-logo_200_200/0/1551019317794?e=2159024400&v=beta&t=eKfXlSItrg6Mxv5DbxiLjqRQczjzP2mVpWsC_M2z1IE"
                  alt=""
                  width="110"
                  height="110"
                /></a>


              <p className="rights">
                <span>©  </span><span className="copyright-year">2020</span
                ><span> </span><span>Waves</span><span>. </span
                ><span>All Rights Reserved.</span>
              </p>
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <h3>Address</h3>
            <dl className="contact-list">
              <dt>Sede Lecce:</dt>
              <dd>Via Rocco Scotellaro, 55, 73100 Lecce LE</dd>
              <dt>Sede Bari:</dt>
              <dd>Primo Piano, Via Dante Alighieri, 25, 70121 Bari BA</dd>
              <dt>Sede Roma:</dt>
              <dd>Piazza in Campo Marzio, 3, 00186 Roma RM</dd>
              <dt>Sede Milano:</dt>
              <dd>Via Messina, 38 Torre B, 20154 Milano MI</dd>
            </dl>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3">
            <h3>Email</h3>
            <dl className="nav-list">
              <dt>Andrea Alfarano</dt>
              <dd><a href="mailto:#">andrea.alfarano@linksmt.it</a></dd>
              <dt>Gianluca Bellafronte</dt>
              <dd><a href="mailto:#">gianluca.bellafronte@linksmt.it</a></dd>
              <dt>Matteo Carrozzo</dt>
              <dd><a href="mailto:#">matteo.carrozzo@linksmt.it</a></dd>
              <dt>Gabriele Caggia</dt>
              <dd><a href="mailto:#">gabriele.caggia@linksmt.it</a></dd>
            </dl>
          </div>

          <div className=" col-sm-12 col-md-3">
            <h3>Contacts</h3>
            <dl className="contact-list">
              <dt>Andrea Alfarano</dt>
              <dd>+39 3662247713</dd>
              <dt>Gianluca Bellafronte</dt>
              <dd>+39 3891752469</dd>
              <dt>Matteo Carrozzo</dt>
              <dd>+39 3203828365</dd>
              <dt>Gabriele Caggia</dt>
              <dd>+39 3288691497</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="row no-gutters social-container">
        <div className="col">
          <a
            className="social-inner"
            href="https://www.facebook.com/linksmanagementandtechnology/"
          ><i className="fa fa-facebook-f"></i><br /><span>Facebook</span></a
          >
        </div>
        <div className="col">
          <a className="social-inner" href="https://www.instagram.com/linksspa/"
          ><i className="fa fa-instagram"></i><br /><span>Instagram</span></a
          >
        </div>
        <div className="col">
          <a className="social-inner" href="https://it.linkedin.com/company/linksmt"
          ><i className="fa fa-linkedin"></i><br /><span>Linkedin</span></a
          >
        </div>
      </div>
    </footer>
  );
}
{/* 
     <div classNameName="bg-light">
       <div classNameName="container d-flex justify-content-between">
         <div classNameName=" col-12 text-center">
           <p classNameName="pt-3"> Copyright Project Work React </p>
           <p>&copy; all rights reserved</p>
         </div>
       </div>
     </div> */}

