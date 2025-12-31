import MediaQuery from 'react-responsive';

export default function Navbar(){
    
    return (
        <div>
            <MediaQuery minWidth={769}>{
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '2vh 45vw' }}>
                    <p className='name-text'>{"<Jasper />"}</p>
                    <div style={{ display: 'flex', gap: '5vh'}}>
                        <p style={{ fontFamily: 'JetBrainsThin', color: "#f8f8f8ff", fontSize: '1.8vh', margin: 0 }}>/home</p>
                        <p style={{ fontFamily: 'JetBrainsThin', color: "#f8f8f8ff", fontSize: '1.8vh', margin: 0 }}>/about</p>
                        <p style={{ fontFamily: 'JetBrainsThin', color: "#f8f8f8ff", fontSize: '1.8vh', margin: 0 }}>/projects</p>
                    </div>
                </div>
            }
            </MediaQuery>
            <MediaQuery maxWidth={768}>{
                <div style={{ width: '100%', height: '100%', position: 'relative', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '4vh' }}>
                    <p style={{ fontFamily: 'JetBrainsThin', color: '#6480bbff', fontSize: '2vh', margin: 0 }}>/// ☰</p>
                </div>
            }
            </MediaQuery>
        </div>
    )
}