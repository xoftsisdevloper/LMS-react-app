import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuthcontext } from '../../contexts/Authcontext';

export const useTests = () => {
    const [loading, setLoading] = useState(false);
    const [tests, setTests] = useState([]);
    const { AuthUser } = useAuthcontext();

    const fetchTests = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://13.60.241.242:2000/api/tests/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    credentials: true
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message);
            }

            const data = await res.json();
            if (data) {
                setLoading(false);
            }
            setTests(data);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTests(); 
        
    },[tests]); 
    return { loading, tests };
};
