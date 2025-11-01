"use client";
import React, { useState } from "react";
import Uploadform from "./_component/Uploadform";
import { Upload as tusUpload } from "tus-js-client";
import { supabase } from "@/firebaseConfig";
import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function Uploadpage() {
  const [progress, setProgress] = useState(0);
  const [FileId, setFileId] = useState();
  const [uploadComplete, setUploadComplete] = useState(false);

  const { getToken, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (uploadComplete) {
      const timeout = setTimeout(() => {
        setProgress(0);
        router.push("/file-preview/" + FileId);
        setUploadComplete(false);
      }, 1500);

      return () => clearTimeout(timeout); // ✅ cleanup
    }
  }, [uploadComplete == true]);

  // Function to save file info to DB
  const saveinfo = async (file, fileUrl, filePath, userEmail, userId) => {
    const docId = Math.random().toString(36).substring(2, 10); // 8-char random string

    await supabase.from("uploades_files").insert([
      {
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_path: filePath,
        file_url: fileUrl,
        user_email: userEmail ?? null,
        user_id: userId ?? null,
        docId_id: docId,
      },
    ]);
    setFileId(docId);
  };

  const uploadFile = async (file) => {
    if (!file) return;

    const token = await getToken({ template: "supabase" });
    const filePath = `uploads/${Date.now()}-${file.name}`;

    const upload = new tusUpload(file, {
      endpoint: `https://hyijnxihmgxqdkjzyzfg.storage.supabase.co/storage/v1/upload/resumable/file-upload
`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        Authorization: `Bearer ${token}`,
        "x-upsert": "true",
      },

      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        cacheControl: "3600",
        bucketName: "file-upload", // ✅ Required
        objectName: filePath, // ✅ This is where path goes
        contentType: file.type,
        owner: userId,
        metadata: JSON.stringify({
          yourCustomMetadata: true,
        }),
      },
      chunkSize: 6 * 1024 * 1024,
      onError: function (error) {
        console.error("Upload failed:", error);
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
        setProgress(percentage);
      },

      onSuccess: async () => {
        const { data } = supabase.storage
          .from("file-upload")
          .getPublicUrl(filePath);

        const userEmail = user?.emailAddresses?.[0]?.emailAddress ?? null;

        console.log(data.publicUrl);

        await saveinfo(file, data.publicUrl, filePath, userEmail, userId);
        setUploadComplete(true);
      },
    });

    upload.start();
  };

  return (
    <div className="p-5 px-8 md:px-28">
      <h2 className="text-[20px] text-center m-5 text-gray-700">
        Start <strong className="text-blue-600">Uploading</strong> file and{" "}
        <strong className="text-blue-600">share</strong> it
      </h2>
      <Uploadform
        uploadBtnClick={(file) => uploadFile(file)}
        progress={progress}
      />
    </div>
  );
}

export default Uploadpage;
