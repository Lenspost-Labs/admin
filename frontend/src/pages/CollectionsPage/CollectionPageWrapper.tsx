import React, { useContext, useEffect } from "react";
import CollectionsPage from "src/pages/CollectionsPage/CollectionsPage";
import { AppContext } from "src/context/AppContext";
import SpecificCollectionPage from "src/pages/CollectionsPage/SpecificCollectionPage";

const CollectionPageWrapper = () => {
  const { currentTab, collectionID } = useContext(AppContext);

  useEffect(() => {
    console.log("currentTab:", currentTab);
    console.log("collectionID:", collectionID);
  }, [currentTab, collectionID]);

  return (
    <>
      {currentTab === 0 && <CollectionsPage />}
      {currentTab === 1 && <SpecificCollectionPage collID={collectionID} />}
    </>
  );
};

export default CollectionPageWrapper;
