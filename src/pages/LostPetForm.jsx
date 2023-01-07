import React, { useContext, useEffect } from "react";
import { LostContext } from "../context/lost/lostContext";
import MainLayout from "../layouts/MainLayout";
import SectionTitle from "../components/SectionTitle";
import PetForm from "../components/PetForm";
import { cleanStorage_fb } from "../service/appService";
import { UserContext } from "../context/user/userContext";

const LostPetForm = () => {
  const { user } = useContext(UserContext);
  const { addLost, submitSuccess } = useContext(LostContext);

  useEffect(() => {
    return () => {
      cleanStorage_fb("lost");
    };
  }, []);

  return (
    <MainLayout>
      <SectionTitle title="Lost a pet? Please complete the form to help." />
      {user && (
        <PetForm
          user={user}
          type="lost"
          addAnimal={addLost}
          submitSuccess={submitSuccess}
        />
      )}
    </MainLayout>
  );
};

export default LostPetForm;
