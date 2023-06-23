import "./welcome.style.css"
import SignIn from "../../components/signin.component/signin.component"

const WelcomeComponent = () => {
    return(
        <div className="welcome-container">
            <div className="welcome-container-content">
                < SignIn />
            </div>
        </div>
    )
}

export default WelcomeComponent