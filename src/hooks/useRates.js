import { useState, useEffect } from 'react';

export default function useRates() {
    const [rates, setRates] = useState({ cft: { air: null, ocean: null, road: null }, cbm: { air: null, ocean: null, road: null } });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL || 'https://ihwtest.kyleinfotech.co.in'}/api/get_rates.php`)
            .then(res => { if (!res.ok) throw new Error('Network error'); return res.json(); })
            .then(data => {
                if (data && !data.error) setRates(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return { rates, loading };
}
