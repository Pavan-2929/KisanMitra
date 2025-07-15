import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/blogs/get-all-blogs");
                setBlogs(res.data.allBlogs || []);
            } catch (error) {
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading blogs...</div>;
    }

    if (!blogs.length) {
        return <div className="text-center py-10">No blogs found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">All Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <Card key={blog._id} className="shadow-lg hover:shadow-2xl transition-shadow duration-200">
                        <CardContent className="p-5 flex flex-col h-full">
                            <h2 className="text-xl font-semibold text-green-800 mb-2">{blog.title}</h2>
                            <div className="text-gray-600 text-sm mb-2">
                                By <span className="font-medium">
                                    {blog.author?.fullName || blog.author?.name || "Unknown"}
                                </span>
                                {" • "}
                                {new Date(blog.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-gray-700 mb-3 line-clamp-4">{blog.description}</div>
                            {Array.isArray(blog.image) && blog.image.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto mb-2">
                                    {blog.image.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            alt={blog.title}
                                            className="h-32 w-32 object-cover rounded border"
                                        />
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-4 text-xs text-gray-500 mt-auto">
                                <span>👍 {blog.likes?.length || 0} Likes</span>
                                <span>💬 {blog.comments?.length || 0} Comments</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
