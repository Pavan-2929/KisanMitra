import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [error, setError] = useState("");
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/blogs/get-blog/${id}`);
                setBlog(res.data.blog);
            } catch (error) {
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        setCommentLoading(true);
        setError("");
        try {
            const userId = JSON.parse(localStorage.getItem("userId"));
            if (!userId) {
                setError("Please login to comment.");
                setCommentLoading(false);
                return;
            }
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}/add-comment`,
                { text: commentText, userId: userId }
            );
            setBlog((prev) => ({
                ...prev,
                comments: [res.data.comment, ...prev.comments],
            }));
            setCommentText("");
        } catch (err) {
            setError("Failed to post comment.");
        } finally {
            setCommentLoading(false);
        }
    };

    const handleLike = async () => {
        setLikeLoading(true);
        setError("");
        try {
            const userId = JSON.parse(localStorage.getItem("userId"));
            if (!userId) {
                setError("Please login to like.");
                setLikeLoading(false);
                return;
            }
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}/togglelike`,
                { userId }
            );
            setBlog((prev) => ({
                ...prev,
                likes: res.data.likes,
            }));
            // Update hasLiked immediately based on new likes array
            setHasLiked(res.data.likes.some(like => like.toString() === userId));
        } catch (err) {
            console.log(err)
            setError("Failed to like blog.");
        } finally {
            setLikeLoading(false);
        }
    };

    // Check if current user has liked the blog


    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!blog) return <div className="text-center py-10 text-red-600">Blog not found.</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 my-10 rounded shadow">
            <h1 className="text-3xl font-bold text-green-700 mb-2">{blog.title}</h1>
            <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
                <span>
                    By <span className="font-medium">{blog.author?.fullName || blog.author?.name || "Unknown"}</span>
                </span>
                <span>•</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            {Array.isArray(blog.image) && blog.image.length > 0 && (
                <div className="flex gap-2 overflow-x-auto mb-4">
                    {blog.image.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={blog.title}
                            className="h-40 w-40 object-cover rounded border"
                        />
                    ))}
                </div>
            )}
            <div className="text-gray-800 mb-6 whitespace-pre-line">{blog.description}</div>
            <div className="flex gap-6 mb-6 items-center">
                <button
                    className={`cursor-pointer flex items-center gap-1 px-3 py-1 rounded font-semibold transition ${hasLiked ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
                    onClick={handleLike}
                    disabled={likeLoading}
                >
                    👍 {blog.likes?.length || 0} {hasLiked ? "Liked" : "Like"}
                </button>
                <span className="flex items-center gap-1 text-blue-700 font-semibold">
                    💬 {blog.comments?.length || 0} Comments
                </span>
            </div>
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2 text-green-700">Comments</h2>
                <form onSubmit={handleCommentSubmit} className="mb-4 flex gap-2">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Write a comment..."
                        disabled={commentLoading}
                    />
                    <button
                        type="submit"
                        className="cursor-pointer bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                        disabled={commentLoading}
                    >
                        {commentLoading ? "Posting..." : "Post"}
                    </button>
                </form>
                {error && <div className="text-red-600 mb-2">{error}</div>}
                {blog.comments?.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {blog.comments.map((comment, idx) => (
                            <div key={idx} className="bg-gray-100 rounded p-3">
                                <div className="text-sm font-semibold text-green-800" >
                                    {comment?.user?.fullName || "Anonymous"}
                                    <span className="ml-2 text-xs text-gray-500">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="text-gray-700 mt-1">{comment.text}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500">No comments yet.</div>
                )}
            </div>
        </div>
    );
};

export default Blog;