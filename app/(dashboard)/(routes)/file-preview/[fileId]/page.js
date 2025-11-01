"use client";
import { supabase } from "@/firebaseConfig";
import React, { useEffect, useState } from "react";
import Fileinfo from "./_components/Fileinfo";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftSquare } from "lucide-react";

function filepreview() {
  const [file, setFile] = useState(null);
  const { fileId } = useParams();
  useEffect(() => {
    console.log(fileId);
    fileId && fetchFile();
  }, []);

  const fetchFile = async () => {
    const { data, error } = await supabase
      .from("uploades_files")
      .select("*")
      .eq("docId_id", fileId) // ✅ match your short ID
      .single();

    if (error) {
      console.error("Error fetching file:", error.message);
    } else {
      console.log("fetching-data", data);
      setFile(data);
    }
  };

  return (
    <div className="py-10 px-20">
      <Link href={"/upload"} className="flex gap-3  text-gray-500">
        <ArrowLeftSquare className="text-gray-500" />
        Go to upload
      </Link>

      <Fileinfo file={file} />
    </div>
  );
}

export default filepreview;
