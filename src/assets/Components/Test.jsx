import { useState, useEffect } from "react";

const Test = () => {
    const data = {
        "dates": {
            "titulo": "libro falso",
            "descripcion": "Como todo en la vida esto no es mas que una simple ilusion",
            "clasificacion": "Todos",
            "num_paginas": 111,
            "precio": 2000,
            "stock": 1,
            "es_fisico": 0,
            "año_publicacion": 2001,
            "id_editorial": 1,
            "id_autor": 1
        }
    };

    const fetchTest = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/usuarios'
            //     , {
            //     method: 'POST',
            //     body: JSON.stringify(data),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // }
        );

            if (!response.ok) throw new Error("Error en la respuesta del servidor");
            else console.log("Usuarios: " + await response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    let mounted = true;
    useEffect(() => {
        if (mounted) fetchTest();
        mounted = false;
    }, []);

    return (
        <div>
            <h2>Hola</h2>
        </div>
    );
};

export default Test;
