import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    name: "",
    description: "",
    cropVariety: "",
    cropAgeValue: "",
    cropAgeUnit: "days",
    harvestDate: "",
    fertilizerUsed: "No",
    pesticidesUsed: "No",
    soilType: "",
    moistureContent: "",
    processingDetails: "Raw",
    qualityGrade: "A",
    certifications: "",
    quantityAvailable: "",
    totalQuantity: "",
    unitOfcrop: "kg",
    pricePerUnit: "",
    bulkDiscount: "",
    negotiable: true,
    storageType: "",
    deliveryOptions: "Pickup",
};

const UploadCrop = () => {
    const [form, setForm] = useState(initialState);
    const [mediaFiles, setMediaFiles] = useState([]);
    const [mediaPreviews, setMediaPreviews] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dropRef = useRef();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Handle media file selection
    const handleMediaChange = (e) => {
        const files = Array.from(e.target.files);
        setMediaFiles(files);
        setMediaPreviews(
            files.map((file) => ({
                type: file.type.startsWith("image/") ? "image" : "video",
                url: URL.createObjectURL(file),
            }))
        );
    };

    // Drag & drop handlers
    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setMediaFiles(files);
        setMediaPreviews(
            files.map((file) => ({
                type: file.type.startsWith("image/") ? "image" : "video",
                url: URL.createObjectURL(file),
            }))
        );
    };
    const handleDragOver = (e) => e.preventDefault();

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validation (add more as needed)
        if (!form.name || !form.description || !form.totalQuantity || !form.unitOfcrop || !form.pricePerUnit) {
            toast.error("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("cropVariety", form.cropVariety);
        formData.append("cropAge[value]", form.cropAgeValue);
        formData.append("cropAge[unit]", form.cropAgeUnit);
        if (form.harvestDate) formData.append("harvestDate", form.harvestDate);
        formData.append("fertilizerUsed", form.fertilizerUsed);
        formData.append("pesticidesUsed", form.pesticidesUsed);
        formData.append("soilType", form.soilType);
        if (form.moistureContent) formData.append("moistureContent", form.moistureContent);
        formData.append("processingDetails", form.processingDetails);
        formData.append("qualityGrade", form.qualityGrade);
        if (form.certifications) {
            form.certifications.split(",").forEach((cert) => formData.append("certifications[]", cert.trim()));
        }
        if (form.quantityAvailable) formData.append("quantityAvailable", form.quantityAvailable);
        formData.append("totalQuantity", form.totalQuantity);
        formData.append("unitOfcrop", form.unitOfcrop);
        formData.append("pricePerUnit", form.pricePerUnit);
        if (form.bulkDiscount) formData.append("bulkDiscount", form.bulkDiscount);
        formData.append("negotiable", form.negotiable);
        if (form.storageType) formData.append("storageType", form.storageType);
        formData.append("deliveryOptions", form.deliveryOptions);

        mediaFiles.forEach((file) => {
            formData.append("files", file);
        });

        // Get userId from localStorage (or Redux if you use it)
        const userId = JSON.parse(localStorage.getItem("userId"));
        console.log(userId);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/crops/add-new-crop`,
                formData,
                {
                    headers: {
                        "userId": userId,
                        // If you need to send multipart/form-data, axios sets it automatically with FormData
                    }
                }
            );
            console.log(res);
            toast.success("Crop added successfully!");
            setForm(initialState);
            setMediaFiles([]);
            setMediaPreviews([]);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-white flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardContent className="p-6">
                    <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
                        Upload Your Crop
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label className={"py-2"} htmlFor="name" >
                                    Crop Name <span className="text-red-500">*</span>
                                </Label>
                                <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="cropVariety">Variety</Label>
                                <Input id="cropVariety" name="cropVariety" value={form.cropVariety} onChange={handleChange} />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="description">
                                    Description <span className="text-red-500">*</span>
                                </Label>
                                <Input id="description" name="description" value={form.description} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="cropAgeValue">Crop Age</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="cropAgeValue"
                                        name="cropAgeValue"
                                        type="number"
                                        min="0"
                                        value={form.cropAgeValue}
                                        onChange={handleChange}
                                        placeholder="Value"
                                    />
                                    <select
                                        name="cropAgeUnit"
                                        value={form.cropAgeUnit}
                                        onChange={handleChange}
                                        className="border rounded px-2 py-1"
                                    >
                                        <option value="days">Days</option>
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="harvestDate">Harvest Date</Label>
                                <Input id="harvestDate" name="harvestDate" type="date" value={form.harvestDate} onChange={handleChange} />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="fertilizerUsed">Fertilizer Used</Label>
                                <Input id="fertilizerUsed" name="fertilizerUsed" value={form.fertilizerUsed} onChange={handleChange} />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="pesticidesUsed">Pesticides Used</Label>
                                <Input id="pesticidesUsed" name="pesticidesUsed" value={form.pesticidesUsed} onChange={handleChange} />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="soilType">Soil Type</Label>
                                <Input id="soilType" name="soilType" value={form.soilType} onChange={handleChange} />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="moistureContent">Moisture Content (%)</Label>
                                <Input
                                    id="moistureContent"
                                    name="moistureContent"
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={form.moistureContent}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="processingDetails">Processing</Label>
                                <select
                                    id="processingDetails"
                                    name="processingDetails"
                                    value={form.processingDetails}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                >
                                    <option value="Raw">Raw</option>
                                    <option value="Semi-processed">Semi-processed</option>
                                    <option value="Packaged">Packaged</option>
                                </select>
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="qualityGrade">Quality Grade</Label>
                                <select
                                    id="qualityGrade"
                                    name="qualityGrade"
                                    value={form.qualityGrade}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                >
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="Organic Certified">Organic Certified</option>
                                </select>
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="certifications">Certifications (comma separated)</Label>
                                <Input id="certifications" name="certifications" value={form.certifications} onChange={handleChange} />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="quantityAvailable">Quantity Available</Label>
                                <Input
                                    id="quantityAvailable"
                                    name="quantityAvailable"
                                    type="number"
                                    min="0"
                                    value={form.quantityAvailable}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="totalQuantity">
                                    Total Quantity <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="totalQuantity"
                                    name="totalQuantity"
                                    type="number"
                                    min="0"
                                    value={form.totalQuantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="unitOfcrop">
                                    Unit <span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="unitOfcrop"
                                    name="unitOfcrop"
                                    value={form.unitOfcrop}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                    required
                                >
                                    <option value="kg">kg</option>
                                    <option value="quintal">quintal</option>
                                    <option value="ton">ton</option>
                                </select>
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="pricePerUnit">
                                    Price Per Unit (₹) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="pricePerUnit"
                                    name="pricePerUnit"
                                    type="number"
                                    min="0"
                                    value={form.pricePerUnit}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="bulkDiscount">Bulk Discount</Label>
                                <Input id="bulkDiscount" name="bulkDiscount" value={form.bulkDiscount} onChange={handleChange} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label className={"py-2"} htmlFor="negotiable">Negotiable</Label>
                                <input
                                    id="negotiable"
                                    name="negotiable"
                                    type="checkbox"
                                    checked={form.negotiable}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="storageType">Storage Type</Label>
                                <Input id="storageType" name="storageType" value={form.storageType} onChange={handleChange} />
                            </div>
                            <div>
                                <Label className={"py-2"} htmlFor="deliveryOptions">Delivery Options</Label>
                                <select
                                    id="deliveryOptions"
                                    name="deliveryOptions"
                                    value={form.deliveryOptions}
                                    onChange={handleChange}
                                    className="border rounded px-2 py-1 w-full"
                                >
                                    <option value="Pickup">Pickup</option>
                                    <option value="Delivery">Delivery</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <Label className="py-2" htmlFor="media">Crop Images / Videos <span className="text-red-500">*</span></Label>
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
                                    required
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
};

export default UploadCrop;
