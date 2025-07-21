import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const defaultProfile =
    "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [profileImageFile, setProfileImageFile] = useState(null);
    const fileInputRef = useRef();

    // Fetch user data on mount
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                // Get userId from localStorage or Redux
                const userId = JSON.parse(localStorage.getItem("userId"));
                console.log("Fetching user with ID:", userId);
                const res = await axios.get(`http://localhost:5000/api/auth/get-user/${userId}`);
                console.log(res.data?.user)
                setUser(res.data?.user);
                setForm(res.data?.user);
            } catch (err) {
                setError("Failed to load user data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else if (name.startsWith("profile.")) {
            setForm((prev) => ({
                ...prev,
                profile: { ...prev.profile, url: value },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Save updated user
    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            const userId = user._id || user.userId;

            // If a new image file is selected, send it with FormData to backend
            if (profileImageFile) {
                const data = new FormData();
                data.append("image", profileImageFile);
                data.append("form", JSON.stringify(form)); // send other fields as well

                const res = await axios.put(
                    `http://localhost:5000/api/users/${userId}/update-with-image`,
                    data,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                setUser(res.data);
                setForm(res.data);
            } else {
                // No new image, just send JSON
                const res = await axios.put(
                    `http://localhost:5000/api/users/${userId}`,
                    form
                );
                setUser(res.data);
                setForm(res.data);
            }

            setEdit(false);
            setProfileImageFile(null);
        } catch (err) {
            setError("Failed to update profile.");
        } finally {
            setSaving(false);
        }
    };

    // Handle image file change
    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProfileImageFile(file);
        // Optionally show preview:
        setForm(prev => ({
            ...prev,
            profile: { ...prev.profile, url: URL.createObjectURL(file) }
        }));
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-600 py-10">{error}</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 my-10 rounded shadow">
            <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">My Profile</h1>
            <div className="flex flex-col items-center mb-6">
                <div className="relative">
                    <img
                        src={form.profile?.url || defaultProfile}
                        alt="Profile"
                        className="h-28 w-28 rounded-full border mb-2 object-cover"
                    />
                    {edit && (
                        <>
                            <button
                                type="button"
                                className="absolute bottom-2 right-2 bg-gray-100 text-blue-900  px-1 py-1 rounded text-xl"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <FaEdit />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImageFileChange}
                            />
                        </>
                    )}
                </div>
                {/* Optionally keep the URL input for manual entry */}
                {edit && (
                    <input
                        type="text"
                        name="profile.url"
                        value={form.profile?.url || ""}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 text-sm w-64 mt-2"
                        placeholder="Profile Image URL"
                    />
                )}
            </div>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div>
                    <label className="font-semibold">Full Name:</label>
                    {edit ? (
                        <input
                            type="text"
                            name="fullName"
                            value={form.fullName || ""}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 w-full"
                            required
                        />
                    ) : (
                        <span className="ml-2">{user.fullName}</span>
                    )}
                </div>
                <div>
                    <label className="font-semibold">Email:</label>
                    <span className="ml-2">{user.email}</span>
                </div>
                {(edit || form.phone) && <div>
                    <label className="font-semibold">Phone:</label>
                    {edit ? (
                        <input
                            type="text"
                            name="phone"
                            value={form.phone || ""}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 w-full"
                            maxLength={10}
                            pattern="[0-9]{10}"
                            required
                        />
                    ) : (
                        <div>
                            <span className="ml-2">{user.phone}</span>
                        </div>
                    )}
                </div>}
                <div>
                    <label className="font-semibold">Category:</label>
                    {edit ? (
                        <select
                            name="categories"
                            value={form.categories || "Farmer"}
                            onChange={handleChange}
                            className="border rounded px-2 py-1 w-full"
                        >
                            <option value="Farmer">Farmer</option>
                            <option value="Dealer">Dealer</option>
                            <option value="Contractors">Contractors</option>
                        </select>
                    ) : (
                        <span className="ml-2">{user.categories}</span>
                    )}
                </div>
                <div>
                    <label className="font-semibold">Verified:</label>
                    <span className="ml-2">{user.isVerified ? "Yes" : "No"}</span>
                </div>
                {/* Address Section */}
                <div>
                    <div className="ml-2 flex flex-col gap-1">
                        {edit ? (
                            <>
                                <div className="">
                                    <label className="font-medium mb-0.5 flex justify-center items-center gap-2">
                                        Address:
                                        <input
                                            type="text"
                                            name="address.formattedAddress"
                                            value={form.address?.formattedAddress || ""}
                                            onChange={handleChange}
                                            className="border rounded px-2 py-1 w-full mb-1 mt-1"
                                            placeholder="Address"
                                        />
                                    </label>
                                </div>
                                <div className=" flex justify-between">
                                    <label className="font-medium mb-0.5 flex justify-center items-center gap-2">
                                        City:
                                        <input
                                            type="text"
                                            name="address.city"
                                            value={form.address?.city || ""}
                                            onChange={handleChange}
                                            className="border rounded px-2 py-1 w-full mb-1 mt-1"
                                            placeholder="City"
                                        />
                                    </label>
                                    <label className="font-medium mb-0.5 flex justify-center items-center gap-2">
                                        State:
                                        <input
                                            type="text"
                                            name="address.state"
                                            value={form.address?.state || ""}
                                            onChange={handleChange}
                                            className="border rounded px-2 py-1 w-full mb-1 mt-1"
                                            placeholder="State"
                                        />
                                    </label>
                                </div>
                                <div className=" flex justify-between">
                                    <label className="font-medium mb-0.5 flex justify-center items-center gap-2">
                                        Country:
                                        <input
                                            type="text"
                                            name="address.country"
                                            value={form.address?.country || ""}
                                            onChange={handleChange}
                                            className="border rounded px-2 py-1 w-full mb-1 mt-1"
                                            placeholder="Country"
                                        />
                                    </label>
                                    <label className="font-medium mb-0.5 flex justify-center items-center gap-2">
                                        Pincode:
                                        <input
                                            type="text"
                                            name="address.pincode"
                                            value={form.address?.pincode || ""}
                                            onChange={handleChange}
                                            className="border rounded px-2 py-1 w-full mb-1 mt-1"
                                            placeholder="Pincode"
                                        />
                                    </label>
                                </div >
                            </>
                        ) : (
                            <>
                                {user.address?.formattedAddress && <div>
                                    <span className="font-medium">Address:</span> {user.address?.formattedAddress || "-"}
                                </div>}
                                {user.address?.city && <div>
                                    <span className="font-medium">City:</span> {user.address?.city || "-"}
                                </div>}
                                {user.address?.state && <div>
                                    <span className="font-medium">State:</span> {user.address?.state || "-"}
                                </div>}
                                {user.address?.country && <div>
                                    <span className="font-medium">Country:</span> {user.address?.country || "-"}
                                </div>}
                                {user.address?.pincode && <div>
                                    <span className="font-medium">Pincode:</span> {user.address?.pincode || "-"}
                                </div>}
                            </>
                        )}
                    </div>
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <div className="flex gap-4 mt-4">
                    {edit ? (
                        <>
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="button"
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                                onClick={() => {
                                    setEdit(false);
                                    setForm(user);
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <div className=" flex justify-center w-full">
                            <button
                                type="button"
                                className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                                onClick={() => setEdit(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;