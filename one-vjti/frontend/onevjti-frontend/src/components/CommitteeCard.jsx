// import React from 'react'
// import api from 'api/axios'
// import { useAuth } from '../context/AuthContext'
// const CommitteeCard = ({committee}) => {
//   return (
//     <div className='bg-white p-6 rounded-xl shadow-md text-center'>
//         {
//             committee.logo && (
//                 <img src={committee.logo} alt={committee.name} className="w-20 h-20 mx-auto mb-4 object-contain"/>
//             )
//         }
//         <h3 className='text-lg font-semibold'>
//         {committee.name}
//         </h3>
//         <p className='text-lg text-gray-800 mt-2'>
//         {committee.description}
//         </p>
//     </div>
//   )
// }

// export default CommitteeCard;

import React from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const CommitteeCard = ({ committee }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();


  // Derived state: Check if this committee's ID is in the user's following array
  // We use .some() or .includes() to compare
  const isFollowing = user?.following?.some(id => id === committee._id);

  const handleFollow = async (e) => {
    e.stopPropagation();

    if (!user) {
        alert("Please login to follow committees");
        return;
    }

    try {
        // Correct the endpoint to match your backend route
        const res = await api.post(`/committees/toggle-follow/${committee._id}`);
        
        // Update global state: res.data.data is the updated following array from your controller
        setUser({ 
            ...user, 
            following: res.data.data 
        });
    } catch (err) {
        console.error("Follow action failed", err);
    }
  };

  console.log("committee.slug =", committee.slug);


   const handleCardClick = () => {
  navigate(`/committees/${committee.slug}`);
};


  return (
    <div
      onClick={handleCardClick}
      className='bg-white p-6 rounded-xl shadow-md text-center border hover:border-purple-400 transition-all cursor-pointer'
    >
      {committee.logo && (
        <img
          src={committee.logo}
          alt={committee.name}
          className="w-20 h-20 mx-auto mb-4 object-contain"
        />
      )}

      <h3 className='text-lg font-bold'>{committee.name}</h3>
      <p className='text-sm text-gray-600 mt-2 mb-4'>
        {committee.description}
      </p>

      <button 
        onClick={handleFollow}
        className={`w-full py-2 rounded-lg font-semibold transition ${
          isFollowing 
            ? 'bg-gray-100 text-gray-600 border border-gray-300' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};


export default CommitteeCard;