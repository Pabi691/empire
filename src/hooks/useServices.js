import { useState, useEffect } from 'react';
import staticServices from '../data/services';

export default function useServices() {
    const [services, setServices] = useState(staticServices);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://ihwtest.kyleinfotech.co.in'}/api/get_services.php`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setServices(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch dynamic services, using static fallback:", err);
                setLoading(false);
            });
    }, []);

    return { services, loading };
}
