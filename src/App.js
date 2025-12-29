import './App.css';
import DarkVeil from './components/bg';
import Scroll from './components/scroll';
import Card from './components/card';

function App() {
  return (
    <div className="main"> 

      <section style={{ position: 'relative', overflow: 'hidden', height: '7vh', alignItems: 'center', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #cccccc4e' }}>
        <h1 style={{ color: 'white', fontSize: '2vh', fontFamily: 'JetBrains' }}>Jasper</h1>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #cccccc4e' }}>
        
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
          padding: '6rem 0rem', 
          position: 'relative', 
        }}>
          
          <div style={{ width: '100%', height: '100%', position: 'relative'}}> 
            {/* content goes here */}
            <Card />

            <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #cccccc4e', display: 'flex', justifyContent: 'center', marginTop: '2rem', padding: '1rem' }}>
              
            

            </section>

            <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #cccccc4e', display: 'flex', justifyContent: 'center', marginTop: '2rem', padding: '1rem' }}>
              
            

            </section>

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