import { useState, useEffect } from 'react';

export default function useRates() {
    const [rates, setRates] = useState({ air: '', ocean: '', road: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL || ''}/api/get_rates.php`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                if (data && !data.error) {
                    setRates(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch rates:", err);
                setLoading(false);
            });
    }, []);

    return { rates, loading };
}
