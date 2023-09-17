import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validator from "validatorjs";
import { register } from "../../Services/Auth";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import routes from "../../routes/routes";

export default function Signup() {
  const navigate = useNavigate();

  const [validation, setValidation] = useState({});

  let form = useRef({
    first_name: null,
    last_name: null,
    phone_number: null,
    email: null,
    password: null,
  });
  // form validation 

  const submit = useCallback(async (e) => {

    e.preventDefault();

    const validator = new Validator(form.current, {
      first_name: 'required',
      last_name: 'required',
      phone_number: 'required',
      email: 'required',
      password: 'required',
    });

    console.log("37 validator", validator)

    setValidation(validator);
    if (validator.fails()) return;
    let data = await register({ ...form.current });
    if (data.status) {
      navigate('/login');
    }
  },[]);

  return (
    <section className="signup">
      <div className="container">
        <div className="row py-5  align-items-center justify-content-center">
          <div className="col-lg-6 col-md-7 col-sm-8 col-8 mx-auto text-start">
            <h1 className="heading-lvl-one">Sign Up</h1>
            <p className="font-weight-light">Fill This Form To Create An Account!</p>
            <form onSubmit={submit} id="cut-form" className="my-md-5 my-3">
              <div className="row justify-content-between align-items-start">
                <div className="col-lg-6">
                  {/* First Name */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="signupFName">First Name <span className="red">*</span></label>
                    <input type="text" name="first_name" value={form.first_name} onChange={(e) => form.current.first_name = e.target.value} className="form-control mt-2 form-field" id="signupFName" placeholder="Enter First Name" />
                    <span>{validation.errors?.first('first_name')}</span>
                  </div>
                </div>
                <div className="col-lg-6">
                  {/* Last Name */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="signupLName">Last Name <span className="red">*</span></label>
                    <input type="text" name="last_name" value={form.last_name} onChange={(e) => form.current.last_name = e.target.value} className="form-control mt-2 form-field" id="signupLName" placeholder="Enter First Name" />
                    <span>{validation.errors?.first('last_name')}</span>
                  </div>
                </div>
                  {/* Email Address */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="signupEmail">Email Address <span className="red">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={(e) => form.current.email = e.target.value} className="form-control mt-2 form-field" id="signupEmail" placeholder="Enter Email Address" />
                    <span>{validation.errors?.first('email')}</span>
                  </div>
                </div>
              {/* Phone Number*/}
              <div className="form-group mb-4">
                <label className="ps-md-4" htmlFor="signupNumber">Phone Number <span className="red">*</span></label>
                {/* <input type="tel" name="phone" value={form.phone} onChange={(e)=> form.current.phone = e.target.value} pattern="[+]{1}[0-9]{11,14}" className="form-control mt-2 form-field" id="signupNumber" placeholder="Enter Phone Number" /> */}
                <PhoneInput
                  className="form-control mt-2 form-field"
                  id="signupNumber"
                  placeholder="Enter Phone Number"
                  value={form.phone_number}
                  country={"US"}
                  onChange={(e) => form.current.phone_number = e}
                />
                <span>{validation?.errors?.first('phone_number')}</span>
              </div>
              <div className="row justify-content-between align-items-center">
                  {/* Password */}
                  <div className="form-group mb-4">
                    <label className="ps-md-4" htmlFor="signupPassword">Password<span className="red">*</span></label>
                    <div className="position-relative">
                      <input type="password" name="password" value={form.password} onChange={(e) => form.current.password = e.target.value} className="form-control mt-2 form-field signupPassword" id="signupPassword" placeholder="Enter Password" />
                      <i className="fa fa-eye-slash signupPass" />
                    </div>
                    <span>{validation?.errors?.first('password')}</span>
                </div>
              </div>
              <button type="submit" className="gold-btn-solid d-inline-block mt-4 eq-width-btn">Signup</button>
              <Link to={routes.login} className="silver-link d-block mt-4">Already have an account? Login</Link>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}
