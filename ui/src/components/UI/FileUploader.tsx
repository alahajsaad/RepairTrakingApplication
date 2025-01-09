import { ChangeEvent, useId, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

type fileUploaderProps = {
    setLogo : (file : File) => void ,

}
const FileUploader = ({setLogo} : fileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null);
  const id = useId();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      //const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase()
      setLogo(selectedFile)
      setFile(selectedFile)
    }
  };

  

   

  //const fileExtension = file?.name.split(".").pop()?.toLowerCase();

  return (
    <div>
        <label htmlFor={id} className={`flex items-center justify-center gap-2 cursor-pointer rounded border border-gray-300 w-full mt-3 p-2 ${file ?  'bg-green-400' : ''}`}>
            {!file ?
              <>
              <FaCloudUploadAlt />
              <p>Ajouter un logo</p>
            </>
             :
              <p>{file?.name}</p>
            }
           
            
        </label>
        <input hidden id={id} type="file" onChange={handleFileChange} />
      {/* {file && (
        <div className="mb-4 text-sm">
          <p>File name: {file.name}</p>
          <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
          <p>Type: {file.type}</p>
          <p>Extension: {fileExtension}</p>
        </div>
      )} */}
     
    </div>
  );
};

export default FileUploader;
