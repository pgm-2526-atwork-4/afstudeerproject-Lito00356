import { useState } from "react";
import "@style/theme.css";
import "./ImageWithFallback.css";
import { Box } from "lucide-react";

export const ImageWithFallback = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  if (!src || error) {
    return (
      <div className="collection-project__thumb-fallback">
        <Box />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

export default ImageWithFallback;
