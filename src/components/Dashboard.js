import useFirebaseAuth from '../hooks/useFirebaseAuth';

function Dashboard() {
    const { signOut } = useFirebaseAuth();

    return (
        <div>
            <form onSubmit={signOut}>
                <button>Sign Out</button>
            </form>
        </div>
    )
}

export default Dashboard