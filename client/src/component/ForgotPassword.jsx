import React,{useState} from "react";
import { LockClosedIcon } from "@heroicons/react/solid";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Example() {
    const [email, setEmail] = useState("");

  
    async function sendmail(e) {
        e.preventDefault();
      const userDetail = {
        credentials: {
          "email": email,
        },
      };
  
      // console.log(userDetail);
      const response = await axios.post('http://localhost:4000/user/forgetpassword', userDetail)
      .then(() => console.log('email sent'))
      .catch((err) => console.log(err))
    }
    
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>


            <div>
              <button
              onClick={sendmail}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Send reset link
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
