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
            <Navigate to="/" />
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
            <Navigate to="/" />
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
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <SignIn />
          ) : isAdmin ? (
            <Navigate to="/admin/home" />
          ) : isMember ?(
            <Navigate to="/user/tasks" />
          ) :  (
            <Navigate to="/invis/myprojects" />
          )
        }
      />
      <Route path="/signup/membre"
              element={ !isAuthenticated ? <MembSignup/> : <Navigate to="/"/>} />
      <Route path="/signup/invis"
              element={ !isAuthenticated ? <InvestSignup/> : <Navigate to="/" />} />
      <Route path="/signin" 
                element={ !isAuthenticated ? <SignIn/> : <Navigate to="/"/>}    />

      <Route path="admin/project/examin/:id" 
                element={<ExaminProject/>} />
      <Route path="admin/project/rapport/:id" 
                element={<ExaminProjectRapport/>}/>
    </Routes>
  );
}

export default App;
