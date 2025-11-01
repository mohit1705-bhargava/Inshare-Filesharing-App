import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

import { supabase } from "@/firebaseConfig"; // ✅ import your client

const TABLE_HEAD = ["File Name", "File Type", "Uploaded On", "File Size"];

export function FileShowing({ userId }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch data from Supabase when userId is available
  useEffect(() => {
    if (userId) fetchFiles();
  }, [userId]);

  async function fetchFiles() {
    setLoading(true);

    const { data, error } = await supabase
      .from("uploades_files") // 👈 your table name
      .select("id, file_name, file_type, created_at, file_size")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching files:", error.message);
    } else {
      setFiles(data);
    }
    setLoading(false);
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <Typography variant="small" color="gray">
                  Loading...
                </Typography>
              </td>
            </tr>
          ) : files.length === 0 ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <Typography variant="small" color="gray">
                  No files found.
                </Typography>
              </td>
            </tr>
          ) : (
            files.map(
              ({ id, file_name, file_type, created_at, file_size }, index) => {
                const isLast = index === files.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {file_name}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {file_type}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(created_at).toLocaleDateString()}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal"
                      >
                        {(file_size / 1024).toFixed(2)} KB
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )
          )}
        </tbody>
      </table>
    </Card>
  );
}
