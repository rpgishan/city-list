import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import FormControl from "react-bootstrap/FormControl";

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
      return <ViewMode name={city.name} photo={city.photo} onEdit={onEdit} />;
    }
  } else {
    return <div>Please select a city</div>;
  }
};

const EditMode = ({
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
    <div className={"container"}>
      <p>
        <FormControl
          type="text"
          value={newName}
          placeholder="City Name"
          size={"lg"}
          maxLength={20}
          onChange={handleNameChange}
        />
      </p>
      <p>
        <textarea
          className={"container-fluid"}
          value={newPhoto}
          rows={4}
          onChange={handlePhotoChange}
        />
      </p>
      <p>
        <Button
          className={"my-2 mx-2"}
          disabled={saveDisabled}
          onClick={onSave}
        >
          Save
        </Button>
        <Button className={"my-2 mx-2"} onClick={onCancel}>
          Cancel
        </Button>
      </p>
      <ImageView src={cityPhoto} alt={cityName} />
    </div>
  );
};

const ViewMode = ({ name, photo, onEdit }) => {
  return (
    <div className={"container"}>
      <h1>{name}</h1>
      <p>
        <Button className={"my-2 mx-2"} onClick={onEdit}>
          {" "}
          Edit{" "}
        </Button>
      </p>
      <ImageView src={photo} alt={name} />
    </div>
  );
};

const ImageView = ({ src, alt }) => {
  return (
    <p>
      <Image src={src} alt={alt} fluid={true} />
    </p>
  );
};

export default CityDetails;
