import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn: "15d"
  })
  //Token takes userId information 

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //Miliseconds format
    httpOnly: true, //users cannot access this through javascript (Avoiding Cross Site Scripting Attacks / XSS Attacks)
    sameSite: "strict", // also to avoid cross-site request forgery / CSRF Attacks
    secure: process.env.NODE_ENV !== "development" //It will only be secure when it's not in development
  })
}

export default generateTokenAndSetCookie