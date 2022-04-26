import { useEffect } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import Home from './Home';


const HomeWrapper = ({ isLoggedIn }) => {
    
    const history = useHistory();

    useEffect(() => {

        if ( !isLoggedIn ) {
            history.replace("/login");
        }

    }, [])
    
    return ( <Home/> );
}

const mapStateToProps = (state) => ({
    isLoggedIn : state.user.isLoggedIn
}) 
 
export default connect(mapStateToProps)(HomeWrapper);