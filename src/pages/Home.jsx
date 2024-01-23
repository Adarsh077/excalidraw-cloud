import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/app/Navbar";
import ExalidrawFilesService from "@/services/excalidraw-files.service";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const files = ExalidrawFilesService.getAllFiles();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  const handleDeleteFile = (id) => {
    ExalidrawFilesService.deleteFile(id);
    setCount(count + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <div className="grid xl:grid-cols-6 gap-4">
          {files.map((file) => (
            <Card
              key={file.id}
              onClick={() => navigate(`/${file.id}`)}
              className="group rounded-md border-0 active:border-[#e0dfff] shadow-none cursor-pointer bg-[#232329] hover:bg-[#31303b]"
            >
              <CardContent className="px-5 py-3 flex items-center justify-between">
                <p className="truncate text-white">{file.name}</p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFile(file.id);
                  }}
                  size="icon"
                  variant="destructive"
                  className="invisible group-hover:visible p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
