import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Notifications = () => {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const res = await api.get("/committees/notifications");
                setFeed(res.data.data);
            } catch (err) {
                console.error("Error fetching feed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeed();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading your feed...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Smart Notifications</h1>
            {feed.length === 0 ? (
                <p className="text-gray-500">Follow some committees to see updates here!</p>
            ) : (
                <div className="space-y-4">
                    {feed.map((note) => (
                        <div key={note._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
                            <div className="flex items-center gap-3 mb-2">
                                <img src={note.committee?.logo} className="w-8 h-8 rounded-full" alt="" />
                                <span className="font-bold text-sm uppercase">{note.committee?.name}</span>
                            </div>
                            <h2 className="font-semibold text-lg">{note.title}</h2>
                            <p className="text-gray-600">{note.message}</p>
                            <span className="text-xs text-gray-400">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;