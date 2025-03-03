import { ComponentLoader } from 'adminjs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add("Dashboard", path.join(__dirname, './components/dashboard')),
  Login: componentLoader.override("Login", path.join(__dirname, './components/login')),
  SidebarBranding: componentLoader.override("SidebarBranding", path.join(__dirname, './components/sidebarBranding')),
  SidebarFooter: componentLoader.override("SidebarFooter", path.join(__dirname, './components/sidebarFooter')),
  LinkComponent: componentLoader.add("LinkComponent", path.join(__dirname, './components/linkComponent')),
  RerouteLinks: componentLoader.add("RerouteLinks", path.join(__dirname, './components/rerouteLinks')),
};

export { componentLoader, Components };
