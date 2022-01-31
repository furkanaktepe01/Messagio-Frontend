import Login from './Login';


const Welcome = ({user, setUser}) => {

    return (
        <div>
            Messagio App
            <Login user={user} setUser={setUser} />
        </div>
    )
}

export default Welcome;






