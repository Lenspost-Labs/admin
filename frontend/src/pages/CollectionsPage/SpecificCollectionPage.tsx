import React, { useContext, useEffect, useState } from "react";
import {
  apiGetCollections,
  apiGetSpecificCollection,
} from "src/apis/backendApis/CollectionsApi";
import {
  Card,
  Text,
  Badge,
  Group,
  Button,
  Pagination,
  Loader,
} from "@mantine/core";
import { IconArrowLeft, IconHistory } from "@tabler/icons-react";
import {AppContext} from "src/context/AppContext";

const SpecificCollectionPage = ({collID}: {collID: number}) => {

  const [activePage, setPage] = useState(1);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setCurrentTab } = useContext(AppContext);
  
  const fnFetchSpecificCollection = async (id: number, page: number) => {
    setLoading(true);
    // const resCollec = await apiGetCollections({ page: page });

    console.log("id:", id);
    console.log("page:", page);

    const resCollec = await apiGetSpecificCollection(collID, page);

    console.log("resCollec:", resCollec);

    setAllCollections(resCollec?.data?.assets);
    setTotalPages(resCollec?.data?.totalPage);
    setLoading(false);
  };

  useEffect(() => {
    // fnFetchSpecificCollection(1, 1);
    // fnFetchCollections(1);
    fnFetchSpecificCollection(collID, 1);
    console.log("activePage:", activePage);
    console.log("totalPages:", totalPages);
  }, [activePage]);

  useEffect(() => {
    console.log("allCollections:", allCollections);
  }, [allCollections]);

  return (
    <>
    <IconArrowLeft className="cursor-pointer fixed top-20 bg-blue-100 rounded-2xl z-50" size={32} onClick={ ()=> setCurrentTab(0)}/>
      <Group
        mt="md"
        justify="space-around"
        align="middle"
        wrap="wrap"
      >
        {allCollections && (
          <>
            {allCollections.length > 0 ? (
              allCollections?.map((collection) => {
                return (
                  <>
                    {loading && <Loader />}
                    {!loading && (
                      <Card
                        className="cursor-pointer"
                        // onClick={() =>
                        //   fnFetchSpecificCollection(collection?.id, activePage)
                        // }
                        w={320}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                      >
                        <Card.Section>
                          <img
                            className="h-fit w-full"
                            src={collection?.imageURL}
                            // height={32}
                            alt={collection?.title}
                          />
                        </Card.Section>

                        <Group
                          justify="space-between"
                          align=" start"
                          mt="md"
                          mb="xs"
                        >
                          <Text fw={500}>{collection?.title}</Text>
                          <Group>
                            <Badge color="pink">ID : {collection?.id}</Badge>
                            {collection?.tokenId && (
                              <>
                                <Badge color="orange">
                                  TOKEN ID : {collection?.tokenId}
                                </Badge>
                                {/* <Badge color="pink">{collection?.edition}</Badge> */}
                                <Badge color="purple">
                                  COLLECTION ID : {collection?.collectionId}
                                </Badge>
                              </>
                            )}

                            {collection?.name && (
                              <Badge color="blue">{collection?.name}</Badge>
                            )}
                          </Group>
                        </Group>

                        <Text size="sm" c="dimmed">
                          {collection?.description}
                        </Text>
                        <a
                          className="mt-2"
                          href={collection?.openseaLink}
                          target="_blank"
                        >
                          <Button color="grey">Opensea</Button>
                        </a>
                        <div className="flex items-center mt-2">
                          <IconHistory size={14} />
                          <div className="text-xs ml-1 ">
                            {new Date(
                              collection?.updatedAt
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </Card>
                    )}
                  </>
                );
              })
            ) : (
              <Loader />
            )}
          </>
        )}
      </Group>

      <div className="bg-white w-full p-4 flex justify-center items-center float-right sticky bottom-0">
        <Pagination
          value={activePage}
          onChange={setPage}
          total={totalPages}
          boundaries={2}
        />
      </div>
    </>
  );
};

export default SpecificCollectionPage;
