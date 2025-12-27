import './App.css';
import ReflectiveCard from './components/ReflectiveCard';

function Card(){
  return (

      <div style={{ height: '600px', position: 'relative' }}>
        <ReflectiveCard
          overlayColor="rgba(0, 0, 0, 0.2)"
          blurStrength={10}
          glassDistortion={15}
          metalness={1}
          roughness={0}
          displacementStrength={25}
          noiseScale={1.5}
          specularConstant={2.0}
          grayscale={0.5}
          color="#ffffff"
        />
      </div>  
  )


}

function App() {
  return (
    <div className="gradient-bg">
      <Card />
    </div>
  );
}

export default App;