import './App.css';
import DarkVeil from './components/bg';
import Scroll from './components/scroll';

function App() {
  return (
    <div> 

      <section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
        <div style={{ height: '100%',overflowY: 'auto',padding: '6rem 2rem' }}>


          <div style={{ width: '100%', height: '600px', position: 'relative' }}> 
              // content here
              <DarkVeil />
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
        />
      </section>

    </div>

  );
}

export default App;