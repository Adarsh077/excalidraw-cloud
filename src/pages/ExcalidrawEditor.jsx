import CaptureOnSave from "@/components/app/CaptureOnSave";
import { Excalidraw } from "@excalidraw/excalidraw";
import { useState } from "react";
import ExalidrawFilesService from "@/services/excalidraw-files.service";
import { useParams } from "react-router";
import { Input } from "@/components/ui/input";

const ExcalidrawEditor = () => {
  const { id } = useParams();
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);
  const file = ExalidrawFilesService.getSingleFile(id);
  const data = ExalidrawFilesService.getExcalidrawDataByFileId(id);
  const [filename, setFilename] = useState(file.name);

  const handleSave = (event) => {
    if (event && event.preventDefault) event.preventDefault();
    if (excalidrawAPI) {
      ExalidrawFilesService.setExcalidrawDataByFileId(id, {
        appState: excalidrawAPI.getAppState(),
        elements: excalidrawAPI.getSceneElements(),
      });
    }
  };

  const handleFileNameChange = (e) => {
    ExalidrawFilesService.updateFile(id, e.target.value);
    setFilename(e.target.value);
  };

  if (data?.appState) {
    delete data?.appState?.collaborators;
  }

  return (
    <CaptureOnSave handleSave={handleSave}>
      <div className="h-screen w-screen">
        <Excalidraw
          onChange={handleSave}
          initialData={{
            elements: data?.elements || [],
            appState: {
              theme: "dark",
              name: filename,
              ...(data?.appState || {}),
            },
          }}
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          handleKeyboardGlobally={true}
          renderTopRightUI={() => {
            return (
              <Input
                className="bg-[#232329] border-0"
                value={filename}
                onChange={handleFileNameChange}
              />
            );
          }}
        />
      </div>
    </CaptureOnSave>
  );
};
export default ExcalidrawEditor;
