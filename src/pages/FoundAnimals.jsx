import React, { useContext, useEffect } from "react";
import styles from "../css/animals.module.css";
import { FoundContext } from "../context/found/foundContext";
import Loader from "../components/loader/Loader";
import PetSmall from "../components/PetSmall";
import MainLayout from "../layouts/MainLayout";
import SectionTitle from "../components/SectionTitle";
import InvitationToRegister from "../components/InvitationToRegister";

const FoundAnimals = ({ user }) => {
  const { getAllFound, found, loading } = useContext(FoundContext);

  useEffect(() => {
    getAllFound();
  }, [getAllFound]);

  return (
    <MainLayout>
      <SectionTitle title={"Found pets"}>
        {!user && !loading && (
          <InvitationToRegister title="Would you like to publish a post?" />
        )}
      </SectionTitle>
      {loading && <Loader />}
      {!loading && found.length > 0 && (
        <div>
          <div className={styles.grid_wrapper}>
            {found.map((item, index) => (
              <PetSmall key={index} pet={item} type={"found"} />
            ))}
          </div>
        </div>
      )}
      {!loading && found.length === 0 && <p>No found pets...</p>}
    </MainLayout>
  );
};

export default FoundAnimals;
