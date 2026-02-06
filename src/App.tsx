import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ValentineProvider } from './context/ValentineContext';
import { Home } from './pages/Home';
import { RoseDay } from './pages/RoseDay';
import { ProposeDay } from './pages/ProposeDay';
import { ChocolateDay } from './pages/ChocolateDay';
import { TeddyDay } from './pages/TeddyDay';
import { PromiseDay } from './pages/PromiseDay';
import { HugDay } from './pages/HugDay';
import { KissDay } from './pages/KissDay';
import { ValentineDay } from './pages/ValentineDay';
import './index.css';

function App() {
  return (
    <ValentineProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rose" element={<RoseDay />} />
            <Route path="/propose" element={<ProposeDay />} />
            <Route path="/chocolate" element={<ChocolateDay />} />
            <Route path="/teddy" element={<TeddyDay />} />
            <Route path="/promise" element={<PromiseDay />} />
            <Route path="/hug" element={<HugDay />} />
            <Route path="/kiss" element={<KissDay />} />
            <Route path="/valentine" element={<ValentineDay />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ValentineProvider>
  );
}

export default App;
