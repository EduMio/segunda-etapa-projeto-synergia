import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskDisplay } from '../imports/ui/displays/TaskDisplay';
import { LoginDisplay } from '../imports/ui/displays/LoginDisplay';
import { ViewTaskDisplay } from '../imports/ui/displays/ViewTaskDisplay';
import { EditTaskDisplay } from '../imports/ui/displays/EditTaskDisplay';
import { EditUserDisplay } from '../imports/ui/displays/EditUserDisplay';
import { DashBoardDisplay } from '../imports/ui/displays/DashBoardDisplay';
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
                        <Route path="/home" element={<DashBoardDisplay />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/tasklist" element={<TaskDisplay />} />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/view/:taskId"
                            element={<ViewTaskDisplay />}
                        />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/edit/:taskId"
                            element={<EditTaskDisplay />}
                        />
                    </Route>

                    <Route element={<ProtectedRoute />}>
                        <Route path="/user" element={<EditUserDisplay />} />
                    </Route>

                    <Route path="*" element={<LoginDisplay />} />
                </Routes>
            </UserProvider>
        </BrowserRouter>
    );
});
