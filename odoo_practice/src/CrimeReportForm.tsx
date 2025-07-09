"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Toaster, toast } from "react-hot-toast";
import { db, storage } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function CrimeForm() {
  const [latitude] = useState("28.6139");
  const [longitude] = useState("77.2090");
  const [address, setAddress] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK" && data.results.length > 0) {
          setAddress(data.results[0].formatted_address);
        } else {
          setAddress("Address not found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error retrieving address");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!crimeType || !description) {
      toast.error("Please fill in all required fields!");
      return;
    }

    toast.loading("Submitting report...", { id: "submit-toast" });

    try {
      let imageUrl = "";

      // 1. Upload image if selected
      if (imageFile) {
        const storageRef = ref(storage, `crimeImages/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      // 2. Add document to Firestore
      await addDoc(collection(db, "crimeReports"), {
        address,
        latitude,
        longitude,
        crimeType,
        description,
        imageUrl,
        createdAt: serverTimestamp()
      });

      toast.success("Your crime report has been submitted!", { id: "submit-toast" });
      setCrimeType("");
      setDescription("");
      setImageFile(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to submit. Please try again.", { id: "submit-toast" });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md rounded-lg border border-gray-300 bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-black">Report an Incident</h2>
        <p className="mt-2 text-sm text-gray-700">
          Please provide details about the crime you are reporting.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Address Field */}
          <LabelInputContainer>
            <Label htmlFor="address" className="text-black font-semibold">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={address}
              disabled
              placeholder="Address"
              className="bg-gray-100 border border-gray-300 text-gray-800 cursor-not-allowed rounded-md p-2"
            />
          </LabelInputContainer>

          {/* Crime Type Dropdown */}
          <LabelInputContainer>
            <Label htmlFor="crime-type" className="text-black font-semibold">
              Crime Type
            </Label>
            <select
              id="crime-type"
              name="crime-type"
              required
              value={crimeType}
              onChange={(e) => setCrimeType(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-black/30"
            >
              <option value="">Select a crime type</option>
              <option value="theft">Theft</option>
              <option value="assault">Assault</option>
              <option value="robbery">Robbery</option>
              <option value="vandalism">Vandalism</option>
              <option value="homicide">Homicide</option>
              <option value="fraud">Fraud</option>
              <option value="other">Other</option>
            </select>
          </LabelInputContainer>

          {/* Description */}
          <LabelInputContainer>
            <Label htmlFor="what-happened" className="text-black font-semibold">
              What Happened?
            </Label>
            <textarea
              id="what-happened"
              name="what-happened"
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-black/30 resize-y"
              placeholder="Please describe the incident in detail..."
            />
          </LabelInputContainer>

          {/* Image Upload */}
          <LabelInputContainer>
            <Label htmlFor="image-upload" className="text-black font-semibold">
              Upload Image (Optional)
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="border border-gray-300 rounded-md p-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-black/30"
            />
          </LabelInputContainer>

          <button
            className="relative block h-10 w-full rounded-md bg-black font-semibold text-white shadow hover:bg-gray-900 transition"
            type="submit"
          >
            Submit Report &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);

export default CrimeForm;
