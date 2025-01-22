import SearchInput from "./SearchInput"
import Conversations from "./Conversations"
import LogoutButton from "./LogoutButton"
const Sidebar = () => {
  //  THE COMPONENTS CAN BE USED AS A CONTAINER FOR DIFFERENT SMALLER COMPONENTS
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      {/* The div class above is needed to build the logout button's structure */}
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
      {/* <Conversations />
      <LogoutButton /> */}
    </div>
    
  )
}

export default Sidebar


//STARTER CODE
// import SearchInput from "./SearchInput"
// import Conversations from "./Conversations"
// import LogoutButton from "./LogoutButton"
// const Sidebar = () => {
//   //  THE COMPONENTS CAN BE USED AS A CONTAINER FOR DIFFERENT SMALLER COMPONENTS
//   return (
//     <div className='border-r border-slate-500 p-4 flex flex-col'>
//       {/* The div class above is needed to build the logout button's structure */}
//       <SearchInput />
//       <div className="divider px-3"></div>
//       <Conversations />
//       <LogoutButton />
//       {/* <Conversations />
//       <LogoutButton /> */}
//     </div>
    
//   )
// }

// export default Sidebar