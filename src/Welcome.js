import Login from './Login';


const Welcome = ({user, setUser}) => {

    return (
        <div>
            Welcome
            <Login user={user} setUser={setUser} />
        </div>
    )
}

export default Welcome;






