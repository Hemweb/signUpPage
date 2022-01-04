import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Example() {
  const [password, setPassword] = useState("");
  const {userId} = useParams()
  const {token} = useParams()
  console.log(userId);
  console.log(token);

  async function resetPass(e) {
    e.preventDefault();
    const userDetail = {
      credentials: {
        "password": password,
      },
    };

    // console.log(userDetail);
    const response = await axios
      .post(`http://localhost:4000/user/${userId}/${token}`, userDetail)
      .then(() => console.log(response))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  New Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
              </div>
            </div>

            <div>
              <button
                onClick={resetPass}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
