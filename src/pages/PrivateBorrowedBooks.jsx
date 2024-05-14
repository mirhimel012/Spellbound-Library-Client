import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateBorrowedBooks = ({children}) => {
    const {user} = useAuth();
    const location = useLocation();
    if(!user){
        return <Navigate to='/login' state={location?.pathname || '/'}></Navigate>
    }
    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateBorrowedBooks;