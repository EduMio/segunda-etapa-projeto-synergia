import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { App } from '../imports/ui/App';
import { LoginDisplay } from '../imports/ui/displays/LoginDisplay';
import { UserProvider } from '../imports/ui/UserContext';
import { ProtectedRoute } from '../imports/ui/ProtectedRoute';
import '../imports/api/TasksMethods';

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  if (!container) throw new Error('#react-target not found');

  const root = createRoot(container);
  root.render(
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<LoginDisplay />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<App />} />
          </Route>

          <Route path="*" element={<LoginDisplay />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
});
