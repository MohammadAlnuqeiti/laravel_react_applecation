import {createContext, useContext, useState} from "react";
import PropTypes from 'prop-types';



const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
}) // function in react

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification, _setNotification] = useState('');

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setNotification = message => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            notification,
            setNotification
            }}>
        {children}
        </StateContext.Provider>
    );
}
ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    };
export const useStateContext = () => useContext(StateContext);
