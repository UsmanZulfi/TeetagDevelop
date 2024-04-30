import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type ImageUploaderProps = {
  name: string;
  label: string;
  image: FileWithPath | null;
  setImage: (file: FileWithPath | null) => void;
};

const ImageUploader = ({
  name,
  label,
  image,
  setImage,
}: ImageUploaderProps) => {
  const [file, setFile] = useState<FileWithPath | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        const fileWithPath = acceptedFiles[0];
        setFile(fileWithPath);
        setImage(fileWithPath);
      }
    },
    [setImage],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
  });
  useEffect(() => {
    if (image) {
      setFile(image);
    }
  }, [image]);
  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-6">
      <label className="mb-4 block capitalize h8 font-fugaz text-green-light">
        {label}
      </label>
      <div {...getRootProps({ className: "teetag__dropzone " })}>
        <input {...getInputProps()} />
        {file ? (
          <p className="h8">{file.name}</p>
        ) : (
          <p className="h8 cursor-pointer">Drag & drop or upload</p>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
