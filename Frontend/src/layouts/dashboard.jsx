import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import fetchUserData from '@/api/fetchUserData';
import { Sidenav, DashboardNavbar, Footer } from '@/widgets/layout';
import routes from '@/routes';
import routesUser from '@/routes-user';
import { useMaterialTailwindController } from '@/context';
import { Spinner } from '@material-tailwind/react';
import { routesInvis } from '@/routes-invis';
import "/public/css/color.css"
export function Dashboard({ isAuthenticated, user, isAdmin,isMember,isInvistigateur }) {
  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

 

  return (
    <div  class ="exact-color" >
      <Sidenav
        routes={isAdmin ? routes :(isMember ? routesUser : routesInvis)}
        brandImg={
          sidenavType === 'dark'
            ? '/public/img/logo-ct.png'
            : '/public/img/logo-ct-dark.png'
        }
      user={user} isAdmin={isAdmin} isMember={isMember} isInvistigateur={isInvistigateur} />
      <div className="p-4 xl:ml-60">
        <DashboardNavbar user ={user}/>
        <Routes>
          {isAdmin
            ? routes
                .filter(({ layout }) => layout === 'admin')
                .map(({ pages }) =>
                  pages.map(({ path, element }) => (
                    <Route
                    key={path}
                    exact
                    path={path}
                    element={React.cloneElement(element, { isAuthenticated, user, isAdmin ,isMember,isInvistigateur})}
                  />))
                )
            :(isMember ? routesUser
                .filter(({ layout }) => layout === 'user')
                .map(({ pages }) =>
                  pages.map(({ path, element }) => (
                    <Route
                    key={path}
                    exact
                    path={path}
                    element={React.cloneElement(element, { isAuthenticated, user, isAdmin,isMember,isInvistigateur })}
                  />))
                ):
                routesInvis
                .filter(({ layout }) => layout === 'invis')
                .map(({ pages }) =>
                  pages.map(({ path, element }) => (
                    <Route
                    key={path}
                    exact
                    path={path}
                    element={React.cloneElement(element, { isAuthenticated, user, isAdmin ,isInvistigateur,isMember})}
                  />))
                )

              )}
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = '/src/layout/dashboard.jsx';

export default Dashboard;
