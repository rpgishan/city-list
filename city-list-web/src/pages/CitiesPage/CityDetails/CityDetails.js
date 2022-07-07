import React, { useState } from "react";

const CityDetails = ({ city, isEditMode, updateSelectedCity, setEditMode }) => {
  const id = city.id;

  const [name, setName] = useState(city.name);
  const [photo, setPhoto] = useState(city.photo);

  const handleNameChange = (event) => {
    if (isEditMode) {
      setName(event.target.value);
    }
  };

  const handlePhotoChange = (event) => {
    if (isEditMode) {
      setPhoto(event.target.value);
    }
  };

  const onCancel = (event) => {
    event.preventDefault();
    if (isEditMode) {
      setName(city.name);
      setPhoto(city.photo);
      setEditMode(false);
    }
  };

  const onSave = (event) => {
    event.preventDefault();
    if (isEditMode) {
      const newCity = {
        ...city,
        name,
        photo,
      };
      updateSelectedCity(newCity);
      setEditMode(false);
    }
  };

  const onEdit = (event) => {
    event.preventDefault();
    if (!isEditMode) {
      setEditMode(true);
    }
  };

  if (id && city.name && city.photo) {
    if (city.name !== name && city.photo !== photo) {
      setName(city.name);
      setPhoto(city.photo);
    }
    if (isEditMode) {
      return (
        <EditMode
          id={id}
          cityName={city.name}
          cityPhoto={city.photo}
          newName={name}
          newPhoto={photo}
          handleNameChange={handleNameChange}
          handlePhotoChange={handlePhotoChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      );
    } else {
      return (
        <ViewMode id={id} name={city.name} photo={city.photo} onEdit={onEdit} />
      );
    }
  } else {
    return <div>Please select a city</div>;
  }
};

const EditMode = ({
  id,
  cityName,
  cityPhoto,
  newName,
  newPhoto,
  handleNameChange,
  handlePhotoChange,
  onSave,
  onCancel,
}) => {
  const saveDisabled = !newName || !newPhoto;

  return (
    <div>
      <h1>{id}</h1>
      <p>
        <input
          type="text"
          value={newName}
          maxLength={20}
          onChange={handleNameChange}
        />
      </p>
      <p>
        <textarea value={newPhoto} rows={5} onChange={handlePhotoChange} />
      </p>
      <p>
        <input
          type="button"
          value="save"
          disabled={saveDisabled}
          onClick={onSave}
        />
        <input type="button" value="Cancel" onClick={onCancel} />
      </p>
      <ImageView src={cityPhoto} alt={cityName} />
    </div>
  );
};

const ViewMode = ({ id, name, photo, onEdit }) => {
  return (
    <div>
      <h1>
        {id} - {name}
      </h1>
      <span>{photo}</span>
      <p>
        <input type="button" value="edit" onClick={onEdit} />
      </p>
      <ImageView src={photo} alt={name} />
    </div>
  );
};

const ImageView = ({ src, alt }) => {
  return (
    <p>
      <img src={src} alt={alt} />
    </p>
  );
};

export default CityDetails;
