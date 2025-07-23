import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const CropInformation = () => {
    const { id } = useParams();
    const [crop, setCrop] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [farmer, setfarmer] = useState({});
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCrop = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/crops/get-crop/${id}`);
                console.log("Fetched crop data:", res.data);
                setCrop(res.data);
                setfarmer(res?.data?.farmer);
                setImages(res?.data?.cropImagesUrl
                    || []);
                setVideos(res?.data?.cropVideosUrl || []);
            } catch (error) {
                toast.error("Failed to fetch crop information.");
                navigate("/crops");
            }

        };
        fetchCrop();
    }, [id]);

    console.log(farmer)
    if (!crop) return <div className="text-center py-20 h-screen  flex justify-center"><ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
    /></div>;


    return (
        <div className="max-w-5xl mx-auto p-6 my-10 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left: Image Gallery */}
                <div className="md:w-1/2 flex flex-col items-center py-14">
                    {/* Main Image */}
                    {images.length > 0 && (
                        <img
                            src={images[selectedImage]?.url}
                            alt={`Crop Image ${selectedImage + 1}`}
                            className="h-96 w-96 object-cover rounded border mb-3 cursor-pointer transition-transform duration-200 hover:scale-105"
                            onClick={() => setShowPreview(true)}
                        />
                    )}
                    {/* Thumbnails */}
                    <div className="flex gap-2 mb-2">
                        {images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img.url}
                                alt={`Thumbnail ${idx + 1}`}
                                className={`h-16 w-16 object-cover rounded border cursor-pointer ${selectedImage === idx ? "ring-2 ring-green-600" : ""}`}
                                onClick={() => setSelectedImage(idx)}
                            />
                        ))}
                    </div>
                    {/* Videos */}
                    {videos.length > 0 && (
                        <div className="flex gap-2 mt-2">
                            {videos.map((vid, idx) => (
                                <video
                                    key={idx}
                                    src={vid.url}
                                    controls
                                    className="h-24 w-24 object-cover rounded border"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Crop Details */}
                <div className="md:w-1/2 flex flex-col gap-3">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">{crop.name}</h1>
                    <div className="text-lg text-gray-700 mb-2">{crop.description}</div>
                    <div className="flex flex-wrap gap-4 mb-2">
                        <div>
                            <span className="font-semibold">Variety:</span> {crop.cropVariety || "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold">Quality:</span> {crop.qualityGrade}
                        </div>
                        <div>
                            <span className="font-semibold">Processing:</span> {crop.processingDetails}
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mb-2">
                        <div className="text-2xl font-bold text-green-700">₹{crop.pricePerUnit} <span className="text-base font-normal">/ {crop.unitOfcrop}</span></div>
                        <div>
                            <span className="font-semibold">Total Quantity:</span> {crop.totalQuantity} {crop.unitOfcrop}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-2">
                        <div>
                            <span className="font-semibold">Crop Age:</span> {crop.cropAge?.value ? `${crop.cropAge.value} ${crop.cropAge.unit}` : "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold">Harvest Date:</span> {crop.harvestDate ? new Date(crop.harvestDate).toLocaleDateString() : "N/A"}
                        </div>
                        <div>
                            <span className="font-semibold">Moisture:</span> {crop.moistureContent || "N/A"}%
                        </div>
                        <div>
                            <span className="font-semibold">Fertilizer:</span> {crop.fertilizerUsed}
                        </div>
                        <div>
                            <span className="font-semibold">Pesticides:</span> {crop.pesticidesUsed}
                        </div>
                        <div>
                            <span className="font-semibold">Soil Type:</span> {crop.soilType}
                        </div>
                    </div>
                    <div>
                        <span className="font-semibold">Certifications:</span> {crop.certifications && crop.certifications.length > 0 ? crop.certifications.join(", ") : "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Bulk Discount:</span> {crop.bulkDiscount || "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Negotiable:</span> {crop.negotiable ? "Yes" : "No"}
                    </div>
                    <div>
                        <span className="font-semibold">Storage Type:</span> {crop.storageType || "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Delivery Options:</span> {crop.deliveryOptions}
                    </div>
                    {/* Farmer Contact Card */}
                    <div className="mt-6 p-4 border rounded bg-green-50 shadow">
                        <h2 className="font-semibold mb-2 text-green-700">Farmer Contact</h2>
                        <div><span className="font-semibold">Name:</span> {farmer.fullName || "N/A"}</div>
                        <div><span className="font-semibold">Email:</span> {farmer.email || "N/A"}</div>
                        <div><span className="font-semibold">Phone:</span> {farmer.phone || "N/A"}</div>
                        <div className="flex gap-2 mt-2">
                            {farmer.phone && (
                                <a href={`tel:${farmer.phone}`} className="btn bg-green-600 text-white px-3 py-1 rounded">Call</a>
                            )}
                            {farmer.phone && (
                                <a
                                    href={`https://wa.me/${farmer.phone}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    WhatsApp
                                </a>
                            )}
                            {farmer.email && (
                                <a href={`mailto:${farmer.email}`} className="btn bg-green-400 text-white px-3 py-1 rounded">Email</a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Image Preview Modal */}
            {showPreview && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-all"
                    onClick={() => setShowPreview(false)}
                >
                    <div className="relative">
                        {/* Cross Button */}
                        <button
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition"
                            onClick={() => setShowPreview(false)}
                            style={{ zIndex: 10 }}
                            aria-label="Close preview"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={images[selectedImage]?.url}
                            alt={`Preview ${selectedImage + 1}`}
                            className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-2xl animate-fade-in"
                            style={{
                                transition: "transform 0.3s",
                                transform: showPreview ? "scale(1)" : "scale(0.95)",
                            }}
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
            {/* Animation keyframes for fade-in */}
            <style>
                {`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95);}
                    to { opacity: 1; transform: scale(1);}
                }
                .animate-fade-in {
                    animation: fade-in 0.3s;
                }
                `}
            </style>
        </div>
    );
};

export default CropInformation;