import { useState } from 'react';

type Props = {
  onUploadSuccess?: (response: unknown) => void;
};

const ALLOWED_FILES = ['package.json', 'package-lock.json'];

export default function FileUpload({ onUploadSuccess }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const validateFiles = (selectedFiles: FileList | File[]) => {
    const nextFiles = Array.from(selectedFiles);
    const invalid = nextFiles.find((file) => !ALLOWED_FILES.includes(file.name));

    if (invalid) {
      setError(`Only ${ALLOWED_FILES.join(' and ')} files are supported.`);
      return [];
    }

    setError(null);
    return nextFiles;
  };

  const handleFiles = (selectedFiles: FileList | File[]) => {
    const validFiles = validateFiles(selectedFiles);
    if (!validFiles.length) {
      return;
    }

    setFiles(validFiles);
    setMessage(null);
  };

  const handleSubmit = async () => {
    if (!files.length) {
      setError('Please select at least one supported file.');
      return;
    }

    setIsUploading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:5000/api/parse', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed.');
      }

      const result = await response.json();
      setMessage(`Uploaded ${files.map((file) => file.name).join(', ')} successfully.`);
      onUploadSuccess?.(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="rounded-2xl border border-dashed border-cyan-400/40 bg-slate-950/70 p-8 text-center"
      >
        <p className="text-lg font-medium text-white">Drag and drop package files here</p>
        <p className="mt-2 text-sm text-slate-400">
          Accepted files: package.json and package-lock.json
        </p>
        <label className="mt-6 inline-flex cursor-pointer rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20">
          <span>Select files</span>
          <input
            type="file"
            multiple
            accept=".json"
            onChange={(event) => handleFiles(event.target.files ?? [])}
            className="hidden"
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <p className="text-sm font-semibold text-white">Selected files</p>
          <ul className="mt-2 space-y-2 text-sm text-slate-300">
            {files.map((file) => (
              <li key={file.name} className="rounded-xl border border-slate-800 bg-slate-950/70 p-2">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-sm text-rose-300">{error}</p>}
      {message && <p className="text-sm text-emerald-300">{message}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isUploading}
        className="rounded-full border border-cyan-400/40 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUploading ? 'Uploading…' : 'Upload files'}
      </button>
    </div>
  );
}
