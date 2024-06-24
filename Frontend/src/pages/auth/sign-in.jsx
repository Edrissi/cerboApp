import React, { useState } from "react";
import { Input, Button, Typography, Alert } from "@material-tailwind/react";
import axios from "axios";
import fetchUserData from '@/api/fetchUserData';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });
  
      if (response.data) {
        setCookie("jwt", response.data.jwt, { path: "/", maxAge: 60 * 60 * 24 }); // 1 day
  
        const { isAdmin, isAuthenticated ,isMember,isInvistigateur } = await fetchUserData();
        console.log("true");
        if (isAdmin && isAuthenticated) {
          navigate("/admin/home", { replace: true });
        } else if (isMember && isAuthenticated) {
          navigate("/user/projects", { replace: true });}
          else if (isInvistigateur && isAuthenticated) {
            navigate("/invis/myprojects", { replace: true });

        }
      }else if(response.data.jwt != ""){
        console.error("Login failed")
      }

    }
     catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors);
        setError(errorMessages[0]);
      } else {
        console.error('Failed to create user:', error);
        setError("Email or Password Invalid");
      }
    }
  };
  

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Se Connecter
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter Votre Email et Password.
          </Typography>
        </div>
      
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
          {error && (
          <Alert variant="ghost" className="bg-red-500 bg-opacity-20 text-red-700">
          <span>{error}</span>
          </Alert>
          )}

            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Votre mail
            </Typography>
            <Input
              size="lg"
              placeholder="name@gmail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleSignIn}>
            Sign In
          </Button>
          <Typography variant="body2"  align="center" className="mt-3">
            Don't have an account? <Link style={{ color: 'blue' }} to="/signup">Sign Up</Link>
          </Typography>
        </form>
      </div>
      {/* <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Pattern"
        />
      </div> */}
    </section>
  );
}
