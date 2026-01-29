// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { Event } from "../models/event.model.js";
// import { Member } from "../models/member.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken"
// import { Committee } from "../models/committee.model.js";
// import { User } from "../models/user.model.js";

// const createCommittee = asyncHandler(async(req, res) => {
//     const {name, description, headUserId} = req.body


//     if(!name || !description || !headUserId) {
//         throw new ApiError(400, "Committee name and head required")
//     }

//     const existsUser = await User.findById(headUserId)

//     if(!existsUser) {
//         throw new ApiError(404, "User not found")
//     }

//     if (req.user.role !== "admin") {
//         throw new ApiError(403, "Unauthorized to create committee");
//     }

//     const logoLocalPath = req.file?.path
//     let logoUrl

//     if(logoLocalPath) {
//         const logo = await uploadOnCloudinary(logoLocalPath)

//         if(!logo) {
//             throw new ApiError(400, "Logo upload failed")
//         }

//         logoUrl = logo.url

//     }

//     const committee = await Committee.create({
//         name,
//         description,
//         logo: logoUrl
//     })

//     await Member.create({
//         user: headUserId,
//         committee: committee._id,
//         role: "head"
//     })

//     return res
//     .status(201)
//     .json(
//         new ApiResponse(
//             201,
//             committee,
//             "Comittee created with Head"
//         )
//     )
// })

// const getAllCommittees = asyncHandler(async(req, res) => {
//     const committees = await Committee.find()
//     .select("name description logo")

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(
//             200,
//             committees,
//             "Committees fetched"
//         )
//     )
// })

// const updateCommittee = asyncHandler(async(req, res) => {
//     const {name, description, committeeId} = req.body

//     if(!committeeId) {
//         throw new ApiError(400, "Committee ID is required");
//     }

//     if (req.user.role !== "admin") {
//         throw new ApiError(403, "Unauthorized to create committee");
//     }

//     const logoLocalPath = req.file?.path
//     let logoUrl

//     if(logoLocalPath) {
//         const logo = await uploadOnCloudinary(logoLocalPath)

//         if(!logo?.url) {
//             throw new ApiError(400, "Logo upload failed")
//         }

//         logoUrl = logo.url

//     }

//     const updateData = {};

//     if (name) updateData.name = name;
//     if (description) updateData.description = description;
//     if (logoUrl) updateData.logo = logoUrl;

//     if (Object.keys(updateData).length === 0) {
//         throw new ApiError(400, "No fields provided for update");
//     }

//     const updatedCommittee = await Committee.findByIdAndUpdate(
//         committeeId,
//         { $set: updateData },
//         { new: true }
//     );

//     if(!updateCommittee) {
//         throw new ApiError(404, "Committee not found.")
//     }

//     return res.status(200).json(
//         new ApiResponse(200, updatedCommittee, "Committee updated successfully")
//     );

// })

// export {
//     createCommittee,
//     getAllCommittees,
//     updateCommittee
// }

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Committee } from "../models/committee.model.js";
import { User } from "../models/user.model.js";
import { Member } from "../models/member.model.js";
import { Notification } from "../models/notification.model.js"; // 🔥 Added missing import

const createCommittee = asyncHandler(async (req, res) => {
    const { name, description, headUserId } = req.body;

    if (!name || !description || !headUserId) {
        throw new ApiError(400, "Committee name, description and head are required");
    }

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Unauthorized to create committee");
    }

    const existsUser = await User.findById(headUserId);
    if (!existsUser) {
        throw new ApiError(404, "Head User not found");
    }

    const logoLocalPath = req.file?.path;
    let logoUrl = "";

    if (logoLocalPath) {
        const logo = await uploadOnCloudinary(logoLocalPath);
        if (!logo) {
            throw new ApiError(400, "Logo upload failed");
        }
        logoUrl = logo.secure_url; // Use secure_url
    }

    const committee = await Committee.create({
        name,
        description,
        logo: logoUrl
    });

    await Member.create({
        user: headUserId,
        committee: committee._id,
        role: "head"
    });

    return res.status(201).json(
        new ApiResponse(201, committee, "Committee created with Head successfully")
    );
});

const getAllCommittees = asyncHandler(async (req, res) => {
    const committees = await Committee.find().select("name description logo slug");  //slug added by me

    return res.status(200).json(
        new ApiResponse(200, committees, "Committees fetched successfully")
    );
});

const updateCommittee = asyncHandler(async (req, res) => {
    const { name, description, committeeId } = req.body;

    if (!committeeId) {
        throw new ApiError(400, "Committee ID is required");
    }

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Unauthorized to update committee");
    }

    const logoLocalPath = req.file?.path;
    let logoUrl;

    if (logoLocalPath) {
        const logo = await uploadOnCloudinary(logoLocalPath);
        if (!logo?.secure_url) {
            throw new ApiError(400, "Logo upload failed");
        }
        logoUrl = logo.secure_url;
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (logoUrl) updateData.logo = logoUrl;

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "No fields provided for update");
    }

    const updatedCommittee = await Committee.findByIdAndUpdate(
        committeeId,
        { $set: updateData },
        { new: true }
    );

    if (!updatedCommittee) { // 🔥 Fixed the variable name here
        throw new ApiError(404, "Committee not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedCommittee, "Committee updated successfully")
    );
});

const toggleFollow = asyncHandler(async (req, res) => {
    const { committeeId } = req.params;
    
    // Check if committee exists before following
    const committee = await Committee.findById(committeeId);
    if (!committee) {
        throw new ApiError(404, "Committee does not exist");
    }

    const user = await User.findById(req.user?._id);

    // Using .toString() for accurate comparison of ObjectIds
    const index = user.following.findIndex(id => id.toString() === committeeId);
    
    if (index === -1) {
        user.following.push(committeeId);
    } else {
        user.following.splice(index, 1);
    }

    await user.save({ validateBeforeSave: false });
    
    return res.status(200).json(
        new ApiResponse(200, user.following, "Follow status updated")
    );
});

const getMyNotifications = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    const notifications = await Notification.find({
        committee: { $in: user.following }
    })
    .populate("committee", "name logo")
    .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, notifications, "Personalized feed fetched")
    );
});

export {
    createCommittee,
    getAllCommittees,
    updateCommittee,
    toggleFollow,
    getMyNotifications
};