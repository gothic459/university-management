import {useNavigate} from "react-router-dom";

const NotFound = (): JSX.Element => {

    const navigate = useNavigate();
    navigate('/', {replace: true});

    return (
        <h1> 404 </h1>
    )
}
export default NotFound;