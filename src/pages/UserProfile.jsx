import React, { useContext, useEffect } from "react";
import styles from "../css/userProfile.module.css";
import { Timestamp } from "firebase/firestore";
import { PetContext } from "../context/pet/petContext";
import { FaPlus } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/buttons/Button";
import UserPetForm from "../components/UserPetForm";
import UserForm from "../components/UserForm";
import { cleanStorage_fb } from "../service/appService";
import { UserContext } from "../context/user/userContext";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const { pets, getAllPets, addPet, loading, updateSuccess } =
    useContext(PetContext);
  const userPets = pets.filter((pet) => pet.uid === user.uid);

  useEffect(() => {
    getAllPets();
  }, [getAllPets]);

  useEffect(() => {
    return () => {
      cleanStorage_fb("pets");
      cleanStorage_fb("users");
    };
  }, []);

  return (
    <MainLayout>
      <div className={styles.user_profile}>
        <div className={styles.section}>
          <SectionTitle title={"My profile"} />
          <UserForm user={user} />
        </div>
        <div className={styles.section}>
          <SectionTitle title={"My pets"} />
          {updateSuccess && (
            <p className="alert alert-success">Update success!</p>
          )}
          {userPets.length > 0 &&
            userPets.map((item) => (
              <div key={item.id} className={styles.pets_container}>
                <UserPetForm pet={item} />
              </div>
            ))}
          {!loading && userPets.length === 0 && (
            <p className="alert alert-seconadary">No pets yet...</p>
          )}

          <div className={styles.add_pet_btn_container}>
            <Button
              type="button"
              icon={<FaPlus />}
              onClick={() =>
                addPet({ uid: user.uid, id: "pet_" + Timestamp.now().seconds })
              }
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfile;
