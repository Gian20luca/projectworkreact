import React from "react";
import "./FooterComponent.css";
export function FooterComponent() {
  return (
    <div className="coloreSfondo text-white">
      <div className="container d-flex justify-content-between">
        <div className=" col-12 text-center">
          <p className="pt-3"> Copyright Project Work React </p>
          <p>&copy; 2021 all rights reserved</p>
          <p>Created by Verdesca - Caliandro - Bellafronte - Colitta</p>
        </div>
      </div>
    </div>
  );
}