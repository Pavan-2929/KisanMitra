import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md"; // Add this for a nice close icon (install react-icons if needed)
import toast from "react-hot-toast";

const UploadBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFiles, setImageFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle file input or drag-drop for multiple images
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            setImageFiles(files);
            setImageUrls(files.map(file => URL.createObjectURL(file)));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files || []);
        if (files.length) {
            setImageFiles(files);
            setImageUrls(files.map(file => URL.createObjectURL(file)));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (!title || !content || imageFiles.length === 0) {
                setError("Please fill all fields and add at least one image.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            if (imageFiles.length > 0) {
                imageFiles.forEach(file => {
                    formData.append("files", file);
                });
            }

            formData.append("title", title);
            formData.append("description", content);
            console.log(title);
            console.log(content);
            console.log(formData)
            const userId = JSON.parse(localStorage.getItem("userId"));
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/blogs/add-new-blog`, formData, {
                headers: {
                    "userId": userId, // Assuming userId is stored in localStorage
                },
            });
            toast.success(res.data.message || "Blog uploaded successfully!");
            console.log(res);
            navigate("/blogs");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to upload blog. Please try again.");
            setError("Failed to upload blog. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Remove image from preview and files
    const handleRemoveImage = (idx) => {
        setImageUrls(prev => prev.filter((_, i) => i !== idx));
        setImageFiles(prev => prev.filter((_, i) => i !== idx));
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 my-10 rounded shadow">
            <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">Upload Your Blog</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Blog Title"
                    className="border rounded px-3 py-2"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Blog Content"
                    className="border rounded px-3 py-2 min-h-[120px]"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    required
                />
                {/* Drag & Drop or File Upload */}
                <div
                    className="border-2 border-dashed border-green-400 rounded p-4 text-center cursor-pointer bg-green-50"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => document.getElementById("blog-image-input").click()}
                >

                    <span className="text-gray-500">Drag & drop images here, or click to select (multiple allowed)</span>
                    <input
                        id="blog-image-input"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="mt-2 overflow-x-auto">
                    <div className="flex flex-nowrap gap-2">
                        {imageUrls.map((url, idx) => (
                            <div key={idx} className="relative group">
                                <img
                                    src={url}
                                    alt={`Preview ${idx + 1}`}
                                    className="h-28 w-28 object-cover rounded border"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 text-red-600 text-lg opacity-0 group-hover:opacity-100 transition"
                                    onClick={e => {
                                        e.stopPropagation();
                                        handleRemoveImage(idx);
                                    }}
                                    title="Remove"
                                >
                                    <MdClose />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <button
                    type="submit"
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Upload Blog"}
                </button>
            </form>
        </div>
    );
};

export default UploadBlog;