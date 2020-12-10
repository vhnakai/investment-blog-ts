import React, { useState } from 'react';
import Dropzone from '../../Components/Dropzone';
import api from '../../services/api';
import {
  UploadImageForm,
  UploadImageButton,
  UploadImageContainer,
  UploadImageJumbotron,
} from './styles';

const UploadImage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [size, setSize] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [quality, setQuality] = useState<string>('');

  const onSubmit = () => {
    const data = new FormData();

    if (selectedFile) {
      data.append('image', selectedFile);
      if (name) data.append('name', name);
      if (tags) data.append('tags', tags);
      if (format) data.append('format', format);
      if (quality) data.append('quality', quality);
      if (size) data.append('size', size);

      api.post('api/images/', data).then(res => {
        console.log(res);
      });
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <>
      <UploadImageJumbotron>
        <h3>Enviar Images </h3>
      </UploadImageJumbotron>
      <UploadImageContainer>
        <UploadImageForm onSubmit={onSubmit}>
          <UploadImageForm.Group>
            <UploadImageForm.Label>Nome: </UploadImageForm.Label>
            <UploadImageForm.Control
              type="text"
              required
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
            />
          </UploadImageForm.Group>

          <UploadImageForm.Group>
            <UploadImageForm.Label>Tags: </UploadImageForm.Label>
            <UploadImageForm.Control
              type="text"
              required
              value={tags}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTags(e.target.value)
              }
            />
          </UploadImageForm.Group>

          <UploadImageForm.Group>
            <UploadImageForm.Label>Tamanho/Dimensões: </UploadImageForm.Label>
            <UploadImageForm.Control
              type="text"
              value={size}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSize(e.target.value)
              }
            />
          </UploadImageForm.Group>

          <UploadImageForm.Group>
            <UploadImageForm.Label>
              Formato (jpg,png,webp):{' '}
            </UploadImageForm.Label>
            <UploadImageForm.Control
              type="text"
              value={format}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormat(e.target.value)
              }
            />
          </UploadImageForm.Group>

          <UploadImageForm.Group>
            <UploadImageForm.Label>quality (0~100): </UploadImageForm.Label>
            <UploadImageForm.Control
              type="text"
              value={quality}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuality(e.target.value)
              }
            />
          </UploadImageForm.Group>

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
  );
};

export default UploadImage;
