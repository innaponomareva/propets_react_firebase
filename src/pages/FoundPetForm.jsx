import React, { useContext, useEffect } from "react";
import { FoundContext } from "../context/found/foundContext";
import MainLayout from "../layouts/MainLayout";
import SectionTitle from "../components/SectionTitle";
import PetForm from "../components/PetForm";
import { cleanStorage_fb } from "../service/appService";
import { UserContext } from "../context/user/userContext";

const FoundPetForm = () => {
  const { user } = useContext(UserContext);
  const { addFound, submitSuccess } = useContext(FoundContext);

  useEffect(() => {
    return () => {
      cleanStorage_fb("found");
    };
  }, []);

  return (
    <MainLayout>
      <SectionTitle title="Found a pet? Please complete the form to help." />
      {user && (
        <PetForm
          user={user}
          type="found"
          addAnimal={addFound}
          submitSuccess={submitSuccess}
        />
      )}
    </MainLayout>
  );
};

export default FoundPetForm;
