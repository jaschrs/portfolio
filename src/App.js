import './App.css';
import DarkVeil from './components/bg';
import Scroll from './components/scroll';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="main"> 

      

      <section style={{ position: 'relative', overflow: 'hidden' }}>
        
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
        }}>
          <DarkVeil />
        </div>

        <div style={{ 
          height: '100%', 
          overflowY: 'auto', 
          padding: '6rem 2rem', 
          position: 'relative', 
        }}>
          
          <div style={{ width: '100%', height: '600px', position: 'relative' }}> 
            {/* content goes here */}
          </div>

        </div>

        <Scroll
          target="parent"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
          style={{ zIndex: 2 }} /* Ensure the scroll effect sits on top of everything */
        />
      </section>

      <section style={{ position: 'relative', overflow: 'hidden' }}>

        

      </section>

      <Analytics />

    </div>

  );
}

export default App;