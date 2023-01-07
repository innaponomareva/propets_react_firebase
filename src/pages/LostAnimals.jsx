import React, { useContext, useEffect } from "react";
import styles from "../css/animals.module.css";
import { LostContext } from "../context/lost/lostContext";
import Loader from "../components/loader/Loader";
import PetSmall from "../components/PetSmall";
import MainLayout from "../layouts/MainLayout";
import SectionTitle from "../components/SectionTitle";
import InvitationToRegister from "../components/InvitationToRegister";
import { UserContext } from "../context/user/userContext";

const LostAnimals = () => {
  const { getAllLost, lost, loading } = useContext(LostContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getAllLost();
  }, [getAllLost]);

  return (
    <MainLayout>
      <SectionTitle title={"Lost pets"}>
        {!user && !loading && (
          <InvitationToRegister title="Would you like to publish a post?" />
        )}
      </SectionTitle>
      {loading && <Loader />}
      {!loading && lost.length > 0 && (
        <div className={styles.grid_wrapper}>
          {lost.map((item, index) => (
            <div key={index}>
              <PetSmall pet={item} type="lost" />
            </div>
          ))}
        </div>
      )}
      {!loading && lost.length === 0 && <p>Juhu!!! Nobody is lost!</p>}
    </MainLayout>
  );
};

export default LostAnimals;
