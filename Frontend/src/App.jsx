import { Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useState, useEffect } from "react";
import { SignIn } from "./pages/auth";
import { Navigate } from "react-router-dom";
import fetchUserData from "./api/fetchUserData";
import Loading from "./layouts/loading";
import MembSignup from "./pages/auth/MembSignup";
import InvestSignup from "./pages/auth/InvestSignup";
import { ExaminProject } from "./pages/dashboard";
import ExaminProjectRapport from "./pages/dashboard/projects/examinprojectrapport";
import LandingPage from "./landingpage/LandingPage";
import SignupSection from "./landingpage/SignupSection";

function App() {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isInvistigateur, setIsInvistigateur] = useState(false);

  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const { isAuthenticated, user, isAdmin ,isMember,isInvistigateur} = await fetchUserData();
        setUser(user);
        setIsAuthenticated(isAuthenticated);
        setIsAdmin(isAdmin);
        setIsMember(isMember);
        setIsInvistigateur(isInvistigateur);
        setDataLoaded(true);
        console.log(isAuthenticated)
        // if (!isAuthenticated) {
        //   navigate('/');
        // }
      } catch (error) {
        console.error('Error fetching user data', error);
        setDataLoaded(true); 
      }
    };
    fetchAuthUser();
  }, [navigate]);

  if (!dataLoaded) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          isAuthenticated && isAdmin ? (
            <Dashboard
              isAuthenticated={isAuthenticated}
              user={user}
              isAdmin={isAdmin}
            />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/user/*"
        element={
          isAuthenticated && isMember ? (
            <Dashboard
              isAuthenticated={isAuthenticated}
              user={user}
              isAdmin={isAdmin}
              isInvistigateur={isInvistigateur}
              isMember={isMember}
            />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/invis/*"
        element={
          isAuthenticated && isInvistigateur ? (
            <Dashboard
              isAuthenticated={isAuthenticated}
              user={user}
              isMember={isMember}
              isAdmin={isAdmin}
              isInvistigateur={isInvistigateur}
              
            />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route
        path="/signin"
        element={
          !isAuthenticated ? (
            <SignIn />
          ) : isAdmin ? (
            <Navigate to="/admin/home" />
          ) : isMember ?(
            <Navigate to="/user/projects" />
          ) :  (
            <Navigate to="/invis/myprojects" />
          )
        }
      />
      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <LandingPage/>
          ) : isAdmin ? (
            <Navigate to="/admin/home" />
          ) : isMember ?(
            <Navigate to="/user/projects" />
          ) :  (
            <Navigate to="/invis/myprojects" />
          )
        }
      />
      <Route path="/signup/membre"
              element={ !isAuthenticated ? <MembSignup/> : <Navigate to="/signin"/>} />
      <Route path="/signup/invis"
              element={ !isAuthenticated ? <InvestSignup/> : <Navigate to="/signin" />} />
      <Route path="/signup"
              element={ !isAuthenticated ? <SignupSection/> : <Navigate to="/signin" />} />

      <Route path="/signin" 
                element={ !isAuthenticated ? <SignIn/> : <Navigate to="/signin"/>}    />

      <Route path="admin/project/examin/:id" 
                element={ isAuthenticated && isAdmin ? <ExaminProject/> : <Navigate to="/signin"/>} />
      <Route path="admin/project/rapport/:id" 
                element={ isAuthenticated && isAdmin ? <ExaminProjectRapport/> : <Navigate to="/signin"/> }/>


    </Routes>
  );
}

export default App;
