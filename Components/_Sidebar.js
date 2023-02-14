import React from 'react';
/* Import library für Sidebar */
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

/* Import für Router library */
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

/* Seiten Importieren */
import Home from '../Sites/Home';
import Kurse from '../Sites/Kurse/Dashboard';
import KurseEdit from '../Sites/Kurse/KurseEdit';
import KurseAdd from '../Sites/Kurse/KurseAdd';
// 
import Dozenten from '../Sites/Dozenten/Dashboard';
import DozentenEdit from '../Sites/Dozenten/DozentenEdit';
import DozentenAdd from '../Sites/Dozenten/DozentenAdd';
// 
import Lernende from '../Sites/Lernende/Dashboard';
import LernendeEdit from '../Sites/Lernende/LernendeEdit';
import LernendeAdd from '../Sites/Lernende/LernendeAdd';
// 
import Lehrbetriebe from '../Sites/Lehrbetriebe/Dashboard';
import LehrbetriebeEdit from '../Sites/Lehrbetriebe/LehrbetriebeEdit';
import LehrbetriebeAdd from '../Sites/Lehrbetriebe/LehrbetriebeAdd';
// 
import Laender from '../Sites/Laender/Dashboard';
import LaenderEdit from '../Sites/Laender/LaenderEdit';
import LaenderAdd from '../Sites/Laender/LaenderAdd';

/* Hier wird die Sidebar erstellt. Ebenso wird hier der Router für die Seiten erstellt. Alle neuen Routen müssen hier definiert werden.*/
const Sidebar = () => {
   return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial'}}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Menu
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
          <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/kurse" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Kurse</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dozenten" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dozenten</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lernende" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lernende</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/lehrbetriebe" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Lehrbetriebe</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/laender" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Laender</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <Routes>
        {/* home */}
        <Route exact path="/" element={<Home />} />
        {/* kurse */}
        <Route exact path="/kurse" element={<Kurse />} />
        <Route path="/kurse/edit/:id" element={<KurseEdit />} />
        <Route path="/kurse/add/" element={<KurseAdd />} />
        {/* KurseShow */}
        <Route exact path="/kurse" element={<KurseShow />} />
        <Route path="/kurse/edit/:id" element={<NoteAdd />} />
        {/* dozenten */}
        <Route exact path="/dozenten" element={<Dozenten />} />
        <Route path="/dozenten/edit/:id" element={<DozentenEdit />} />
        <Route path="/dozenten/add/" element={<DozentenAdd />} />
        {/* lernende */}
        <Route exact path="/lernende" element={<Lernende />} />
        <Route path="/lernende/edit/:id" element={<LernendeEdit />} />
        <Route path="/lernende/add/" element={<LernendeAdd />} />
        {/* lehrbetriebe */}
        <Route exact path="/lehrbetriebe" element={<Lehrbetriebe />} />
        <Route path="/lehrbetriebe/edit/:id" element={<LehrbetriebeEdit />} />
        <Route path="/lehrbetriebe/add/" element={<LehrbetriebeAdd />} />
        {/* laender */}
        <Route exact path="/laender" element={<Laender />} />
        <Route path="/laender/edit/:id" element={<LaenderEdit />} />
        <Route path="/laender/add/" element={<LaenderAdd />} />
      </Routes>
    </div>
  );
};

export default Sidebar;