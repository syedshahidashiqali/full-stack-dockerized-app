import React, { useEffect, useState } from "react";
import { getUser } from "../../Services/Profile";

export default function Profile() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUserData = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser)
    }

    getUserData()
  },[user?.status])

  return (
    <section className="aboutUs">
      <div className="container">
        <div className="row py-5  align-items-center justify-content-center">
          <div className="col-lg-6 col-md-7 col-sm-8 col-8 mx-auto text-start">
            <h1 className="heading-lvl-one">My Profile</h1>
            {user?.status == null ? (<p>Loading</p>) : (
              <form id="cut-form" className="my-md-5 my-3">
                <div className="row justify-content-between align-items-start">
                  <div className="col-lg-6">
                    {/* First Name */}
                    <div className="form-group mb-4">
                      <label className="ps-md-4">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control mt-2 form-field"
                        disabled={true}
                        value={user?.detail?.first_name}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    {/* Last Name */}
                    <div className="form-group mb-4">
                      <label className="ps-md-4">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control mt-2 form-field"
                        disabled={true}
                        value={user?.detail?.last_name}
                      />
                    </div>
                  </div>
                    {/* Email Address */}
                    <div className="form-group mb-4">
                      <label className="ps-md-4">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control mt-2 form-field"
                        disabled={true}
                        value={user?.detail?.email}
                      />
                    </div>
                  </div>
                {/* Phone Number*/}
                <div className="form-group mb-4">
                  <label className="ps-md-4">
                    Phone Number
                  </label>
                  <input 
                    type="tel"
                    className="form-control mt-2 form-field"
                    disabled={true}
                    value={user?.detail?.phone_number}
                  />
                </div>
              </form>

            )}
          </div>
        </div>
      </div>
    </section>
  );
}
