import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud, Loader2 } from "lucide-react"; // Import Loader2
import axios from "axios";
import toast from "react-hot-toast";

const Crop = () => {
    const [cropName, setCropName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [cropAge, setCropAge] = useState("");
    const [price, setPrice] = useState(""); // Add this with other useState hooks
    const [mediaFiles, setMediaFiles] = useState([]);
    const [mediaPreviews, setMediaPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
    const dropRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleFiles = (files) => {
        let images = [];
        let videos = [];
        let previews = [];

        Array.from(files).forEach((file) => {
            if (file.type.startsWith("image/")) {
                if (images.length < 5) { // Allow up to 10 images
                    images.push(file);
                    previews.push({ type: "image", url: URL.createObjectURL(file) });
                }
            } else if (file.type.startsWith("video/") && (file.type === "video/mp4" || file.type === "video/webm")) {
                if (videos.length < 2) {
                    videos.push(file);
                    previews.push({ type: "video", url: URL.createObjectURL(file) });
                }
            }
        });

        setMediaFiles([...images, ...videos]);
        setMediaPreviews(previews);
    };

    const handleMediaChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start loading

        const formData = new FormData();
        if (!cropName || !description || !quantity || !cropAge || !price) {
            toast.error("Please fill in all fields.");
            setIsSubmitting(false); // Stop loading
            return;
        }
        formData.append("cropName", cropName);
        formData.append("description", description);
        formData.append("quantity", quantity);
        formData.append("cropAge", cropAge);
        formData.append("price", price); // Add price to formData
        mediaFiles.forEach(file => {
            formData.append("files", file);
        });

        try {
            await axios.post("http://localhost:5000/api/crops/add-new-crop", formData);

            toast.success("Crop added successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setIsSubmitting(false); // Always stop loading
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex items-center justify-center p-4">
            <Card className="w-full max-w-lg shadow-2xl">
                <CardContent className="p-6">
                    <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
                        Upload Your Crop
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label className=" py-2" htmlFor="cropName">Crop Name</Label>
                            <Input
                                id="cropName"
                                value={cropName}
                                onChange={(e) => setCropName(e.target.value)}
                                placeholder="e.g., Wheat, Rice"
                                required
                            />
                        </div>
                        <div>
                            <Label className=" py-2" htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your crop"
                                required
                            />
                        </div>

                        <div>
                            <Label className=" py-2" htmlFor="media">Crop Images / Videos</Label>
                            <div
                                ref={dropRef}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                className="border-2 border-dashed border-green-400 rounded p-4 text-center cursor-pointer bg-green-50 hover:bg-green-100"
                                onClick={() => dropRef.current.querySelector('input').click()}
                            >
                                <Input
                                    id="media"
                                    type="file"
                                    accept="image/*,video/mp4,video/webm"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleMediaChange}
                                />
                                <div>
                                    <UploadCloud className="inline-block mr-2 text-green-700" size={18} />
                                    Upload or Drag & drop <span className="text-green-700 underline">browse</span>
                                </div>
                            </div>
                            <div className="mt-2 overflow-x-auto">
                                <div className="flex flex-nowrap gap-2">
                                    {mediaPreviews.map((media, idx) =>
                                        media.type === "image" ? (
                                            <img
                                                key={idx}
                                                src={media.url}
                                                alt={`Preview ${idx}`}
                                                className="h-20 w-20 object-cover rounded border flex-shrink-0"
                                            />
                                        ) : (
                                            <video
                                                key={idx}
                                                src={media.url}
                                                controls
                                                className="h-20 w-20 object-cover rounded border flex-shrink-0"
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label className=" py-2" htmlFor="quantity">Quantity (kg)</Label>
                            <Input
                                id="quantity"
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter quantity in kg"
                                required
                            />
                        </div>
                        <div>
                            <Label className=" py-2" htmlFor="cropAge">Crop Age (days)</Label>
                            <Input
                                id="cropAge"
                                type="number"
                                min="0"
                                value={cropAge}
                                onChange={(e) => setCropAge(e.target.value)}
                                placeholder="How many days old?"
                                required
                            />
                        </div>
                        <div>
                            <Label className=" py-2" htmlFor="price">Price (₹)</Label>
                            <Input
                                id="price"
                                type="number"
                                min="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price in INR"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <UploadCloud className="mr-2 h-4 w-4" />
                            )}
                            {isSubmitting ? "Uploading..." : "Submit Crop"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Crop;
