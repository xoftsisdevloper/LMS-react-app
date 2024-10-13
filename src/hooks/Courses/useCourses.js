import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuthcontext } from '../../contexts/Authcontext';

export const useCourse = () => {
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState([]);
    const { AuthUser } = useAuthcontext();

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/courses', {
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
            setCourse(data);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(); 
        
    },[course]); 
    return { loading, course };
};
