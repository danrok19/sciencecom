import React, { useState, useRef, useEffect } from 'react'

const ImageUpload = ({ onInput, id , amount}) => {
    const [file, setFile] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();
    const [previewUrl, setPreviewUrl] = useState();

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === amount) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        onInput(id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
      };

    return (
        <div>
            <input
                id={id}
                ref={filePickerRef}
                style={{ display: 'none' }}
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={pickedHandler}
            />
            <div>
                <div>
                    {previewUrl && <img style={{ width: '100%' }} src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Wybierz zdjęcie prezentacyjne</p>}
                </div>
                <div type="button" onClick={pickImageHandler} style={{ display: 'flex', background: '#950740', width: 'fit-content', padding: '.3rem 1rem', margin: '1rem auto', borderRadius: '.5rem'}}>
                    Wybierz zdjęcie
                </div>
            </div>
        </div>
    )
}

export default ImageUpload
