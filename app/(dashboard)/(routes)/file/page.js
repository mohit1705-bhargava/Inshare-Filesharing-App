"use client";
import { UserButton } from "@clerk/nextjs";

import { useUser } from "@clerk/nextjs";
import { FileShowing } from "./_component/FileShowing";

export default function FilesPage() {
  const { user } = useUser();

  if (!user) return <p>Please log in to view files.</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <FileShowing userId={user.id} />
    </div>
  );
}
