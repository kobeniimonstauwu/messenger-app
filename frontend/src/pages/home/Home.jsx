//SIDEBAR WILL BE HERE SINCE THE MAIN URL HAS THE SIDEBAR IN THE BACKEND FOR FETCHING USERS
import Sidebar from "../../components/sidebar/Sidebar"
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      {/* The height is adjusted based on the screen sizes and adjusts it (responsive), it also adjusts the width automatically */}
      <Sidebar />
      <MessageContainer />
    
    </div>
  )
}

export default Home