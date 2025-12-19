import React, { useState, useEffect } from 'react';

export function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  style, 
  ...props 
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [error, setError] = useState(false);

  // Reset error state if the src prop changes (important for lists/reusing components)
  useEffect(() => {
    setError(false);
  }, [src]);

  const handleError = () => {
    setError(true);
  };

  // If the image fails, show a dynamic placeholder with the recipe name
  if (error) {
    // Generates a nice gray background with the alt text (e.g., "Burger") in the center
    const placeholderText = alt || 'Delicious Food';
    const placeholderSrc = `https://placehold.co/800x600/e2e8f0/475569?text=${encodeURIComponent(placeholderText)}&font=lato`;

    return (
      <img
        src={placeholderSrc}
        alt={alt}
        className={`${className} object-cover`}
        style={style}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={handleError}
      {...props}
    />
  );
}