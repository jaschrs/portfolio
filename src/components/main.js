import MediaQuery from 'react-responsive';
import Card from './card';
import ShinyText from './shiny';

export default function Main(){
    
    return (
        <div>
            <MediaQuery minWidth={769}>{
                <div style={{ width: '100%', height: '100%', position: 'relative', gap: '40vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Card />
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', }}>
                        <p style={{ fontFamily: 'VeraReg', color: '#6480bbff', fontSize: '2vh', margin: 0 }}>/// Aspiring Software Engineer</p>
                        <p style={{ fontFamily: 'Vera', fontSize: '10vh', margin: 0 }}><ShinyText text="Jasper"/></p>
                        <p style={{ fontFamily: 'Vera', color: '#54575bff', fontSize: '10vh', margin: 0 }}>Christian.</p>
                        
                    </div>
                </div>
            }
            </MediaQuery>
            <MediaQuery maxWidth={768}>{
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '10vw' }}>
                        <div style={{ }}>
                            <p style={{ fontFamily: 'VeraReg', color: '#6480bbff', fontSize: '1.5vh', margin: 0 }}>/// Aspiring Software Engineer</p>
                        </div>
                        <p style={{ fontFamily: 'Vera', fontSize: '6vh', margin: 0 }}><ShinyText text="Jasper"/></p>
                        <p style={{ fontFamily: 'Vera', color: '#54575bff', fontSize: '6vh', margin: 0 }}>Christian.</p>
                        
                </div>
            }
            </MediaQuery>
        </div>
    )
}