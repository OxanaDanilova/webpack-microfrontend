import {Outlet} from 'react-router';
import {Header} from "../components/Header";

function Layout() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', flex: 1, height: '100vh', maxWidth:'1620px', margin:'0 auto'}}>
      <Header />
      <div style={{display: 'flex', flexDirection:'column', flex:1,alignItems:'center', justifyContent:'center', backgroundColor:'#aaaaaa29'}}>
        <Outlet/>
      </div>
    </div>

  );
}
export default Layout;
