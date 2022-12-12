import React, { useContext, useEffect, useState } from "react";
import styles from "../css/userProfile.module.css";
import { useFormik } from "formik";
import { PetContext } from "../context/pet/petContext";
import { onFileChange_fb } from "../service/appService";
import { FaSave, FaPlus } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Button from "./buttons/Button";
import TextInput from "./controls/TextInput";
import AvatarUploadCard from "./AvatarUploadCard";

const UserPetForm = ({ pet }) => {
  const { updatePet, deletePet, updateSuccess } = useContext(PetContext);
  const [fileUrl, setFileUrl] = useState("");
  const [fileNameInStorage, setFileNameInStorage] = useState("");

  useEffect(() => {
    if (updateSuccess) {
      console.log("updateSuccess", updateSuccess);
    }
  }, [updateSuccess]);

  useEffect(() => {
    setFileUrl(pet && pet.avatar ? pet.avatar : "");
    setFileNameInStorage(
      pet && pet.fileNameInStorage ? pet.fileNameInStorage : ""
    );
  }, [pet]);

  const onFileChange = async (event) => {
    try {
      const response = await onFileChange_fb(event, { directory: "pets" });
      setFileUrl(response.fileUrl);
      setFileNameInStorage(response.fileNameInStorage);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      nick: pet ? pet.nick : "",
      type: pet ? pet.type : "",
      sex: pet ? pet.sex : "",
    },
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await updatePet({
          ...values,
          id: pet.id,
          uid: pet.uid,
          avatar: fileUrl ? fileUrl : "",
          fileNameInStorage: fileNameInStorage ? fileNameInStorage : "",
        });
      } catch (error) {
        console.log("error", error);
      } finally {
        actions.setSubmitting(false);
      }

      actions.setSubmitting(false);
    },
    enableReinitialize: true,
  });

  return (
    <>
      {pet && (
        <form name={pet.id}>
          <div className={styles.content}>
            <div className={styles.photo_box}>
              <AvatarUploadCard
                id={`photo_${pet.id}`}
                name="photo"
                type={"pet"}
                uploadIcon={<FaPlus />}
                onChange={onFileChange}
                fileUrl={fileUrl}
              />
            </div>
            <div className={styles.controls}>
              <TextInput
                type="text"
                label="Nick:"
                id={`nick_${pet.id}`}
                name="nick"
                placeholder="pet's nickname"
                value={formik.values.nick}
                onChange={formik.handleChange}
              />
              <TextInput
                type="text"
                label="Type:"
                id={`type_${pet.id}`}
                name="type"
                placeholder="e.g. dog"
                value={formik.values.type}
                onChange={formik.handleChange}
              />
              <TextInput
                type="text"
                label="Sex:"
                id={`sex_${pet.id}`}
                name="sex"
                placeholder="male / female"
                value={formik.values.sex}
                onChange={formik.handleChange}
              />
            </div>
          </div>
          <div className={styles.btn_container}>
            <Button
              type="submit"
              icon={<FaSave />}
              fillGreen
              onClick={formik.handleSubmit}
            />
            <Button
              type="button"
              icon={<RiDeleteBin2Fill />}
              fillRed
              onClick={() => {
                const result = window.confirm(
                  "Are you sure you want to delete this pet?"
                );
                if (result) return deletePet(pet.id, pet.fileNameInStorage);
              }}
            />
          </div>
        </form>
      )}
    </>
  );
};

export default UserPetForm;
