import { useCallback, useEffect } from "react";

const CaptureOnSave = ({ children, handleSave }) => {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === "s") {
        handleSave(event);
      }
    },
    [handleSave]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return <div>{children}</div>;
};
export default CaptureOnSave;
