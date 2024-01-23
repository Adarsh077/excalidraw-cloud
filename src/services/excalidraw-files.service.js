import { v4 as uuid } from "uuid";

class ExalidrawFilesService {
  static excalidrawFileLocalStorageKey = "excalidraw-files";

  static getAllFiles() {
    const filesJson = localStorage.getItem(this.excalidrawFileLocalStorageKey);
    if (!filesJson) return [];
    try {
      return JSON.parse(filesJson);
    } catch (error) {
      return [];
    }
  }

  static addFile(name) {
    const files = this.getAllFiles();

    const fileId = uuid();

    files.push({
      name,
      id: fileId,
    });

    localStorage.setItem(
      this.excalidrawFileLocalStorageKey,
      JSON.stringify(files)
    );

    return { id: fileId };
  }

  static getSingleFile(id) {
    const files = this.getAllFiles();

    const fileIndex = files.findIndex((file) => file.id === id);

    return files[fileIndex];
  }

  static updateFile(id, name) {
    const files = this.getAllFiles();

    const fileIndex = files.findIndex((file) => file.id === id);

    if (fileIndex < 0) {
      return false;
    }

    files[fileIndex].name = name;

    localStorage.setItem(
      this.excalidrawFileLocalStorageKey,
      JSON.stringify(files)
    );

    return true;
  }

  static deleteFile(id) {
    const files = this.getAllFiles();

    const fileIndex = files.findIndex((file) => file.id === id);

    if (fileIndex < 0) {
      return false;
    }

    files.splice(fileIndex, 1);
    this.removeExcalidrawDataByFileId(id);

    localStorage.setItem(
      this.excalidrawFileLocalStorageKey,
      JSON.stringify(files)
    );

    return true;
  }

  static setExcalidrawDataByFileId(id, data) {
    localStorage.setItem(id, JSON.stringify(data));
  }

  static getExcalidrawDataByFileId(id) {
    const data = localStorage.getItem(id);
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  static removeExcalidrawDataByFileId(id) {
    localStorage.removeItem(id);
  }
}

export default ExalidrawFilesService;
