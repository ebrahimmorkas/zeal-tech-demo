import { DemoRoutes } from '../../app/DemoRoutes';
import Layout from './Layout';
import Home from './pages/Home';
import About from './pages/About';
import Companies, { CompanyDetail } from './pages/Companies';
import Partner from './pages/Partner';
import News, { NewsDetail } from './pages/News';
import Roadmap from './pages/Roadmap';
import Gallery from './pages/Gallery';
import Leadership from './pages/Leadership';
import Resources, { ResourceDetail } from './pages/Resources';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/** Concept 1 — Refined Corporate Classic, mounted at /demo1/* */
export default function Demo1() {
  return (
    <DemoRoutes
      pages={{ Layout, Home, About, Companies, CompanyDetail, Partner, News, NewsDetail, Roadmap, Gallery, Leadership, Resources, ResourceDetail, Contact, NotFound }}
    />
  );
}
