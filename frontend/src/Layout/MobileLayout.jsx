import TopNavBar from "../components/Mobile/TopNavBar"
import BottomNavBar from "../components/Mobile/BottomNavBar"
import Main from '../components/Mobile/Main'

const MobileLayout = () => {
  return (
    <div className="block md:hidden">
    <TopNavBar/>
    <Main/>
    <BottomNavBar/>
      
    </div>
  )
}

export default MobileLayout
