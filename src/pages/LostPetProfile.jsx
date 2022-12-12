import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { LostContext } from "../context/lost/lostContext";
import { UserContext } from "../context/user/userContext";
import PetProfile from "../components/PetProfile";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/loader/Loader";

const LostPetProfile = () => {
  const { getAllLost, lost, loading } = useContext(LostContext);
  const { users, getAllUsers } = useContext(UserContext);
  const { id } = useParams();
  const post = lost.find((item) => item.postId === id);

  useEffect(() => {
    getAllLost();
    getAllUsers();
  }, [getAllLost, getAllUsers]);

  return (
    <MainLayout>
      {loading && <Loader />}
      {!loading && post && users && <PetProfile post={post} users={users} />}
      {!loading && !post && <p>Pet not found...</p>}
    </MainLayout>
  );
};

export default LostPetProfile;
