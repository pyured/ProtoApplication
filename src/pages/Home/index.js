import Chat from "./Chat/chat.js";
import LaunchTiles from '../LaunchTiles/LaunchTiles';
import "./style.scss";
import bannerImg from "./banner.jpg";


function Home(){
    const url = 'https://ddna-nagarro-inc14e1--careerpathwaysproto.soului.dh.soulmachines.cloud/?sig=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU4OTEwODgsImlzcyI6InNpZ25lZF91cmwtYWI1MDczYTEtNzAxMy00NWQ2LTlkMTktNGNhMGE2NDJlN2M0IiwiZXhwIjoxODAyMjA0Njg4LCJlbWFpbCI6Im5hZ2Fycm8taW5jMTRlMS0tY2FyZWVycGF0aHdheXNwcm90b0BkZG5hLnN0dWRpbyIsInNvdWxJZCI6ImRkbmEtbmFnYXJyby1pbmMxNGUxLS1jYXJlZXJwYXRod2F5c3Byb3RvIn0.G87zwz-1BLw8UHDEZtQQFQVCqiX6f-xoBp2A3bi9JHs'
    return (
        <div className="main-home">
            <div className="chatContainer">
                <div className="bannerContainer">
                    <img src={bannerImg}></img>
                </div>
                <Chat/>
            </div>
            <LaunchTiles/>
        </div>
    );
}
export default Home;