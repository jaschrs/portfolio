import MediaQuery from "react-responsive"
import TerminalCard from "../terminal"

export default function About(){
 
    return(

        <div>
            <MediaQuery minWidth={769}>{
                <div style={{ gap: '11vw', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '3vw' }}>
                    <div style={{  display: 'flex', flexDirection: 'column' }}>
                        <p style={{ color: '#ffffffff', fontFamily: 'VeraReg', fontSize: '2vw'}}>About Me.</p>
                        <p style={{ color: '#aeb8c4ff', fontFamily: 'Serif', fontSize: '0.9vw', maxWidth: '30vw' }}>Hello! Im Jasper Christian, a 19-year-old Computer Science student at Brock University. I'm passionate about software development and constantly seeking to enhance my skills and knowledge in the field. Welcome to my portfolio!</p>
                    </div>    
                    <TerminalCard />
                </div>
            }
            </MediaQuery>
            <MediaQuery maxWidth={768}>{
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '7vw' }}>
                        
                </div>
            }
            </MediaQuery>
        </div>

    )

}