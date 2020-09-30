import React,{useState} from 'react';
import Dropzone from '../../Components/Dropzone';
import api from "../../services/api";
import { UploadImageForm, UploadImageButton, UploadImageContainer, UploadImageJumbotron } from './styles';


const UploadImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const onSubmit = () => {

      const data = new FormData();

      if(selectedFile){
          data.append('image', selectedFile);
      }

      //api.post('points', data); saida para inserir no Mongo WIP
  }

  const handleFile = (file: File) => {
    setSelectedFile(file);
    // console.log(file);

    const size = '1024';
    const formData = new FormData();
    formData.append('image', file);
    formData.append('size', size);
    api.post('/images/add', formData).then(res => {
      console.log(res);
    });
  }

  return(
    <>
      <UploadImageJumbotron>
        <h3>Enviar Images </h3>
      </UploadImageJumbotron>
      <UploadImageContainer>
        <UploadImageForm onSubmit={onSubmit}>
          <UploadImageForm.Group>
            <Dropzone onFileUploaded={handleFile} />
          </UploadImageForm.Group>
          <UploadImageForm.Group>
            <UploadImageButton type="submit" variant="primary">
              Enviar
            </UploadImageButton>
          </UploadImageForm.Group>
        </UploadImageForm>
      </UploadImageContainer>
    </>
  )
};

export default UploadImage;
