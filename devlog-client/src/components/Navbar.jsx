import { Link } from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import GitSearchComponent from './gitSearch';
import SnackBar from './SnackBar';


const Navbar = ({ isLoggedIn }) => {
    const snack = useSelector(state => state.snackbar.snackbar)
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light d-block bg-dark px-3 py-3">
            <div className="container-xl d-flex justify-content-between align-items-center">
                <div className="flex-grow-1">
                    <Link className="navbar-brand text-white text-xl" to="/" >
                        <span>&lt;</span>Devlog🚀<span>/&gt;</span>
                    </Link>
                </div>
                {isLoggedIn ? <div className="flex-grow-1">
                    <GitSearchComponent />
                </div> : <></>}
                <div className="">
                    {
                        isLoggedIn ? (
                            <>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarCollapse">
                                    <div className="navbar-nav mx-lg-auto ">
                                        <Link className="nav-item nav-link active text-white text-md" to="/" aria-current="page">Home</Link>
                                        <Link className="nav-item nav-link text-white text-md" to="/profile">Profile</Link>
                                        <Link className="nav-item nav-link text-white text-md" to="/community">Community</Link>
                                        <Link className="nav-item nav-link text-white text-md" to="/explore">Explore</Link>
                                        <Link className="nav-item nav-link text-white text-md" to="/link-test">test</Link>
                                        <a className="nav-item nav-link text-white text-md" href="/logout">Logout</a>
                                    </div>
                                </div>
                            </>
                        ) : null
                    }
                </div>
            </div>
        </nav>
        <SnackBar isOpen={snack.open} message={snack.message} type={snack.type}/>
        </>
    );
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps)(Navbar);
