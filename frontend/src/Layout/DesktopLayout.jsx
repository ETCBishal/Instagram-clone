
import Left from '../components/Desktop/Left'
import { useThemeStore } from '../store/useThemeStore'

const DesktopLayout = ({children}) => {
  const {light} = useThemeStore()
  
  
  return (
    <div data-theme={light?'light':'dark'} className="max-h-[100vh] md:grid grid-cols-1 lg:grid-cols-[20vw_80vw] md:grid-cols-[10vw_90vw]">

      <Left/>

      {children}


    </div>
  )
}

export default DesktopLayout
