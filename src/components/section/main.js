import MediaQuery from 'react-responsive';
import Card from '../card';
import ShinyText from '../shiny';
import TextType from '../type';

export default function Main(){
    
    return (
        <div>
            <MediaQuery minWidth={769}>{
                <div style={{ width: '100%', height: '100%', position: 'relative', gap: '40vh', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Card />
                    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', }}>
                        <p style={{ fontFamily: 'JetBrains', color: '#0c4196', fontSize: '2vh', margin: 0 }}>/// Aspiring Software Engineer</p>
                        <p style={{ fontFamily: 'Vera', fontSize: '10vh', margin: 0 }}><ShinyText text="Jasper"/></p>
                        <p style={{ fontFamily: 'Vera', color: '#54575bff', fontSize: '10vh', margin: 0 }}>Christian.</p>
                        <p style={{ fontFamily: 'JetBrains', color: '#54575bff', fontSize: '18px', margin: 0, marginTop: '3vh' }}>19 year old CS student at Brock University </p>
                    </div>
                </div>
            }
            </MediaQuery>
            <MediaQuery maxWidth={768}>{
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '7vw' }}>
                        <p style={{ fontFamily: 'Vera', fontSize: '6vh', margin: 0 }}><ShinyText text="Jasper"/></p>
                        <p style={{ fontFamily: 'Vera', color: '#54575bff', fontSize: '6vh', margin: 0 }}>Christian.</p>
                </div>
            }
            </MediaQuery>
        </div>
    )
}