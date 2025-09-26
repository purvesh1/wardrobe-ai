import React, { useRef, useState, useCallback, useId } from 'react';
import { UploadIcon } from './icons';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [isDragActive, setIsDragActive] = useState(false);
  const [feedback, setFeedback] = useState<string>('Drop a photo or browse to upload.');

  const triggerBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFile = useCallback(
    (file: File | undefined | null) => {
      if (!file) return;
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setFeedback('Only JPG, PNG, or WebP files are supported.');
        return;
      }
      setIsDragActive(false);
      setFeedback('Processing your upload...');
      onImageUpload(file);
    },
    [onImageUpload]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    handleFile(file);
    event.target.value = '';
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      triggerBrowse();
    }
  };

  return (
    <div className="space-y-5">
      <input
        type="file"
        id={inputId}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={ACCEPTED_TYPES.join(',')}
      />
      <label
        htmlFor={inputId}
        className={cn(
          'relative flex min-h-[240px] w-full flex-col items-center justify-center gap-5 rounded-2xl border border-orange-200/70 bg-gradient-to-br from-white via-amber-50/60 to-orange-100/40 p-10 text-center shadow-lg transition-transform duration-200',
          isDragActive ? 'scale-[1.01] border-primary shadow-xl' : 'hover:-translate-y-0.5 hover:shadow-xl'
        )}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-md">
          <UploadIcon className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-foreground">Upload your outfit</p>
          <p className="text-sm text-foreground/70">{feedback}</p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            triggerBrowse();
          }}
        >
          Browse files
        </Button>
        <p className="text-xs text-foreground/60">Accepted formats: JPG, PNG, WebP • Max size 10 MB</p>
      </label>
    </div>
  );
};

export default ImageUploader;
