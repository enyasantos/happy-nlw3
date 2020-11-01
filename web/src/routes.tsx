import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';

import Logon from './pages/Logon';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';

import OrphanagesCreated from './pages/OrphanagesCreated';
import OrphanagesPending from './pages/OrphanagesPending';
import OrphanageReview from './pages/OrphanageReview';
import OrphanageEdit from './pages/OrphanageEdit';

import DeleteOrphanageConfirm from './pages/DeleteOrphanageConfirm';
import CreateOrphanageConfirm from './pages/CreateOrphanageConfirm';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/orphanages/create" component={CreateOrphanage}/>
                <Route path="/orphanages-map" component={OrphanagesMap}/>
                <Route path="/orphanages/:id" component={Orphanage}/>

                <Route path="/create-orphanage-confirm" component={CreateOrphanageConfirm}/>

                <Route path="/dashboard/logon" component={Logon}/>
                <Route path="/dashboard/forgot-password" component={ForgotPassword}/>
                <Route path="/dashboard/password-reset" component={PasswordReset}/>

                <Route path="/dashboard/orphanages-created" component={OrphanagesCreated}/>
                <Route path="/dashboard/orphanages-pending" component={OrphanagesPending}/>

                <Route path="/dashboard/orphanages-review" component={OrphanageReview}/>
                <Route path="/dashboard/orphanages-edit" component={OrphanageEdit}/>

                <Route path="/dashboard/delete-orphanage-confirm" component={DeleteOrphanageConfirm}/>
                
            </Switch>
        </BrowserRouter>
    );
}