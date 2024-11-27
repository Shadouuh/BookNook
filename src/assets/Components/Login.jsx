import { useState, useEffect } from "react";

const Login = () => {

    const [user, setUser] = useState({});

    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:3000/usuario/login', {
                method: 'POST',
                body: JSON.stringify({
                    "user": {
                        "key": "juan hot",
                        "clave": "contra1234"
                    }
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();
        } catch (error) {
            console.error("Error al logearse:", error);
        }
    }

    useEffect(() => {
        setUser(fetchUser());
        console.log(user);
    }, []);

    return (
        <>
            {user == "" ? (<h3>Ta logeado</h3>) :
              (<h2>Malio sal</h2>)}
        </>
    );
};

export default Login;