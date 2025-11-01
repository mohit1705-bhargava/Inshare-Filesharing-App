"use client";
import { File, Files, icons, Shield } from "lucide-react";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SideNav() {
  const router = useRouter();

  const menuList = [
    {
      id: 1,
      name: "Upload",
      icon: Upload,
      path: "/upload",
    },
    { id: 2, name: "Files", icon: Files, path: "/file" },
    {
      id: 3,
      name: "Upgrade",
      icon: Shield,
      path: "/upgrade",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="shadow-sm border-r h-full">
      <div className="p-5 border-b">
        <Image src="/image.png" alt="iamge" width={150} height={100} />
      </div>
      <div className="flex flex-col float-left w-full">
        {menuList.map((item, index) => {
          return (
            <button
              key={item.id}
              className={`flex items-center gap-4 p-4 px -6 hover:bg-gray-200 text-gray-800 ${
                activeIndex == index ? "bg-blue-50 text-blue-500" : null
              }`}
              onClick={() => {
                router.push(item.path);
                setActiveIndex(index);
              }}
            >
              <item.icon size={20} />
              <h2>{item.name}</h2>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SideNav;
