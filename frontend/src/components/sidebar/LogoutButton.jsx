import { TbLogout2 } from "react-icons/tb";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const {loading, logout} = useLogout()
  return (
    <div className="mt-auto">
      {!loading ? (
        <TbLogout2 className="w-6 h-6 text-white cursor-pointer"
        onClick={logout}
        />
        // Basically it updates the local storage, and the cookies and token SHOULD AS WELL - in this course it doesn't seem to be the case. - It's only jwt and localstorage
        // It also uses the authContext - setAuthUser where the user data is set to null so you will go back to the login page based on the routes

      ):
      (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  )
}

export default LogoutButton