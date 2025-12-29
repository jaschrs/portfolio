import './App.css';
import DarkVeil from './components/bg';
import Scroll from './components/scroll';

function App() {
  return (
    <div> 

      <section style={{ position: 'relative', height: 500, overflow: 'hidden' }}>
        
        {/* 1. Move DarkVeil here. Position it absolutely to cover the parent section. */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 0 /* Ensures it sits behind the content */ 
        }}>
          <DarkVeil />
        </div>

        {/* 2. Your Scrollable Content Wrapper */}
        {/* Added zIndex: 1 to ensure text appears above the veil */}
        <div style={{ 
          height: '100%', 
          overflowY: 'auto', 
          padding: '6rem 2rem', 
          position: 'relative', 
          zIndex: 1 
        }}>
          
          <div style={{ width: '100%', height: '600px', position: 'relative' }}> 
            {/* Your content goes here. DarkVeil is removed from here. */}
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

    </div>

  );
}

export default App;