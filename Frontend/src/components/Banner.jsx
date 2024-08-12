import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css'; // Import the CSS file

const Banner = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/banner/get')
            .then(response => {
                const initialBanners = response.data.map(banner => ({
                    ...banner,
                    isVisible: true,
                }));
                setBanners(initialBanners);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load banner data');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading && Array.isArray(banners)) {
            const countdownIntervals = banners.map((banner, index) => {
                if (banner.timer > 0) {
                    return setInterval(() => {
                        setBanners(prevBanners => {
                            return prevBanners.map((b, i) => {
                                if (i === index) {
                                    const updatedBanner = { ...b };
                                    if (updatedBanner.timer > 0) {
                                        updatedBanner.timer -= 1;
                                    }
                                    if (updatedBanner.timer <= 0) {
                                        updatedBanner.isVisible = false;
                                    }
                                    return updatedBanner;
                                }
                                return b;
                            }).filter(b => b.isVisible);
                        });
                    }, 1000);
                }
                return null;
            });

            return () => {
                countdownIntervals.forEach(timerId => {
                    if (timerId) clearInterval(timerId);
                });
            };
        }
    }, [loading, banners]);

    const handleVisibility = (index) => {
        setBanners(prevBanners => {
            return prevBanners.map((b, i) => {
                if (i === index) {
                    return { ...b, isVisible: !b.isVisible };
                }
                return b;
            });
        });
    }

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="banner-container">
            {Array.isArray(banners) && banners.map((banner, index) => (
                <div key={index} className="banner">
                    <div className="banner-content">
                        <h2>{banner.description}</h2>
                        <button onClick={() => handleVisibility(index)}>Toggle</button>
                        {banner.isVisible && (
                            <div>
                                <p>Disappearing in {banner.timer} seconds</p>
                                {banner.link && <a href={banner.link} target="_blank" rel="noopener noreferrer">Click Here</a>}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Banner;
