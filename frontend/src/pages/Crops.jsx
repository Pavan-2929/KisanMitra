import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Crops = () => {
    const [crops, setCrops] = useState([]);
    const [interested, setInterested] = useState({}); // { cropId: true/false }
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.auth.isLogin);
    console.log("Is user logged in:", isLogin);

    useEffect(() => {
        const fetchCrops = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/crops/get-all-crops");
                console.log(res.data);
                setCrops(res.data);
            } catch (error) {
                setCrops([]);
            } finally {
                setLoading(false);
            }
        };
        fetchCrops();
    }, []);

    const handleInterest = async (cropId) => {
        try {

            if (!isLogin) {
                navigate("/signin");
                toast.error("Please login to register interest in crops.");
                return;
            }
            setInterested((prev) => ({ ...prev, [cropId]: true }));

            const userId = JSON.parse(localStorage.getItem("userId"));
            const res = await axios.post(`http://localhost:5000/api/crops/interest/${cropId}`, { dealerId: userId });
            navigate(`/crop-information/${cropId}`);
        } catch (error) {
            console.error("Error registering interest:", error);
            // Optionally show an error message to the user
        }
    };

    if (loading) {
        return <div className="text-center py-10">Loading crops...</div>;
    }

    if (!crops.length) {
        return <div className="text-center py-10">No crops found.</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 py-8 px-4">
            <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">All Crops</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {crops.map((crop) => (
                    <Card key={crop._id} className="shadow-lg">
                        <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                                {crop.cropImagesUrl && crop.cropImagesUrl.length > 0 && (
                                    <img
                                        src={crop.cropImagesUrl[0].url}
                                        alt={crop.name}
                                        className="h-32 w-32 object-cover rounded mb-2 border"
                                    />
                                )}
                                <h2 className="text-lg font-semibold text-green-800">{crop.name}</h2>
                                <p className="text-gray-700 mb-1">{crop.description}</p>
                                <div className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium">Variety:</span> {crop.cropVariety || "N/A"}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium">Quantity:</span> {crop.totalQuantity} {crop.unitOfcrop}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium">Price/Unit:</span> ₹{crop.pricePerUnit}
                                </div>
                                <div className="text-sm text-gray-600 mb-1">
                                    <span className="font-medium">Quality:</span> {crop.qualityGrade}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">Processing:</span> {crop.processingDetails}
                                </div>
                                {!interested[crop._id] ? (
                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700 text-white mt-2"
                                        onClick={() => handleInterest(crop._id)}
                                    >
                                        I'm Interested
                                    </Button>
                                ) : (
                                    <div className="mt-3 w-full bg-green-100 rounded p-2 text-green-800 text-sm">
                                        <div className="font-semibold mb-1">Farmer Contact Info:</div>
                                        {crop.farmer && (
                                            <>
                                                <div><span className="font-medium">Name:</span> {crop.farmer.name || "N/A"}</div>
                                                <div><span className="font-medium">Email:</span> {crop.farmer.email || "N/A"}</div>
                                                <div><span className="font-medium">Phone:</span> {crop.farmer.phone || "N/A"}</div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Crops;
