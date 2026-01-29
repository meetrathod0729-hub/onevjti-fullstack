import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { committeeProfiles } from '../data/committeeProfiles';

const CommitteeDetailPage = () => {
    const { id } = useParams();   // slug
    const profile = committeeProfiles[id];

    const [activeTab, setActiveTab] = useState('about');

    if (!profile) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold">Demo profile not found</h1>
                <p className="text-gray-600">
                    No frontend demo data for this committee yet.
                </p>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">

            <h1 className="text-4xl font-bold capitalize">{id}</h1>

            {/* TABS */}
            <div className="flex gap-6 border-b mb-6 mt-6">
                {['about', 'events', 'members'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2 font-semibold capitalize ${activeTab === tab
                                ? 'border-b-2 border-purple-600 text-purple-600'
                                : 'text-gray-500'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'about' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* About Text */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold mb-3">About</h2>
                        <p className="text-gray-700 leading-relaxed">
                            {profile.about}
                        </p>
                    </div>

                    {/* Info Card */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold mb-4">Information</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Email</span>
                                <span className="font-semibold">{profile.email}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Founded</span>
                                <span className="font-semibold">{profile.founded}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Category</span>
                                <span className="font-semibold">{profile.category}</span>
                            </div>
                        </div>
                    </div>

                </div>
            )}


            {activeTab === 'events' && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Events</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {profile.events.map((event, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow p-5 hover:shadow-lg transition"
                            >
                                <h3 className="text-lg font-semibold mb-2">
                                    {event}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Event details coming soon.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'members' && (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Core Team</h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {profile.members.map((member, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow p-5 text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl">
                                    {member[0]}
                                </div>

                                <p className="font-semibold">{member}</p>
                                <p className="text-sm text-gray-500">
                                    Committee Role
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default CommitteeDetailPage;
