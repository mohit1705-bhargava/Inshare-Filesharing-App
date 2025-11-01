import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { DivOrigami } from "./Logoaniamated";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";

function Fileinfo({ file }) {
  const [fileType, setFileType] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (file?.file_type) {
      const type = file.file_type.split("/")[0];
      setFileType(type);
    }
  }, [file]);

  const SendEmail = () => {
    const data = {
      emailToSend: email,
      userName: user?.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
    };
    GlobalApi.SendEmail(data).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded-md shadow-md space-y-3 mt-17">
      {file && (
        <>
          <div>
            <DivOrigami />
          </div>

          {/* Email Send */}
          <div>
            <label className="text-sm font-medium flex flex-col items-center justify-center w-full text-gray-600 text size-2.5">
              Send File to Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full mt-1 p-2 border rounded text-sm"
            />
            <button
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={() => SendEmail()}
            >
              Send Email
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Fileinfo;
