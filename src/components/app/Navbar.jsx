import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ExalidrawFilesService from "@/services/excalidraw-files.service";

const Navbar = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    const { id } = ExalidrawFilesService.addFile("Untitled");
    navigate(`/${id}`);
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-12 items-center justify-between px-4 pt-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl text-white">Excalidraw Cloud</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <Button onClick={handleCreateClick} className="gap-2 bg-[#232329]">
            <Plus className="w-4 h-4" />
            CREATE
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
