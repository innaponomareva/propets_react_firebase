import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { FoundContext } from "../context/found/foundContext";
import { UserContext } from "../context/user/userContext";
import PetProfile from "../components/PetProfile";
import MainLayout from "../layouts/MainLayout";
import Loader from "../components/loader/Loader";

const FoundPetProfile = () => {
  const { getAllFound, found, loading } = useContext(FoundContext);
  const { users, getAllUsers } = useContext(UserContext);
  const { id } = useParams();
  const post = found.find((item) => item.postId === id);

  useEffect(() => {
    getAllFound();
    getAllUsers();
  }, [getAllFound, getAllUsers]);

  return (
    <MainLayout>
      {loading && <Loader />}
      {!loading && users.length > 0 && post && (
        <PetProfile post={post} users={users} />
      )}
      {!loading && !post && <p>Pet not found...</p>}
    </MainLayout>
  );
};

export default FoundPetProfile;
