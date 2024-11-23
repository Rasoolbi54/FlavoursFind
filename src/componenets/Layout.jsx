import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from './SideBar';


function Layout() {
  const location = useLocation();
  const isDetailsPage = location.pathname.includes('/recipe/'); // Check if it's the details page

  return (
    <div className="flex">
      {!isDetailsPage && <SideBar/>} {/* Render sidebar only if not on details page */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
