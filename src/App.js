import './App.css';
import DarkVeil from './components/bg';
import Scroll from './components/scroll';
import Main from './components/section/main';
import NavBar from './components/section/navbar';
import About from './components/section/about';

function App() {
  return (
    <div className="main"> 

      <section style={{ position: 'relative', overflow: 'hidden', height: '3.3vw', alignItems: 'center', display: 'flex', justifyContent: 'center', borderBottom: '1px solid #cccccc4e', gap: '4vh' }}>
        <NavBar />
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #cccccc4e' }}>

        
        
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', }}>
          <DarkVeil />
        </div>

        <div style={{ padding: '6rem 0vw'}}>
          
          <div style={{ width: '100%', height: '100%', position: 'relative'}}> 
            {/* content goes here */}
            <Main />
            

            <section style={{ position: 'relative', overflow: 'hidden', borderTop: '1px solid #cccccc4e', display: 'flex', justifyContent: 'center', marginTop: '2rem', padding: '1rem' }}>
              
            <About />

            </section>

          </div>

        </div>

        <Scroll target="parent" position="bottom"height="6rem" strength={2} divCount={5} curve="bezier" exponential={true} opacity={1} style={{ zIndex: 2 }} />

      </section>

    </div>

  );
}

export default App;