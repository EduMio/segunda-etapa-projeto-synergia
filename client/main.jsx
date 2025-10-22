import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import {App} from '../imports/ui/App';               // default export
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../imports/api/TasksMethods'; // only if it’s safe on the client


Meteor.startup(() => {
  const container = document.getElementById('react-target');
  
  if (!container) 
    throw new Error("Root element #react-target not found in DOM");

  const root = createRoot(container);
  root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}/>
      </Routes>
    </BrowserRouter>
  </>
  );
});
