import React, { useEffect, useState } from "react";
import { apiGetCollections } from "src/apis/backendApis/CollectionsApi";
import { Card, Text, Badge, Group, Button, Pagination, Loader } from "@mantine/core";
import { IconHistory } from "@tabler/icons-react";

const CollectionsPage = () => {
  const [activePage, setPage] = useState(1);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fnFetchCollections = async (pgNo: number) => {
    setLoading(true);
    const resCollec = await apiGetCollections({ pgNo: pgNo });

    console.log("resCollec:", resCollec);

    setAllCollections(resCollec?.data?.assets);
    setTotalPages(resCollec?.data?.totalPage);
    setLoading(false);
  };

  useEffect(() => {
    fnFetchCollections(activePage);
    console.log("activePage:", activePage);
    console.log("totalPages:", totalPages);
  }, [activePage]);
  return (
    <>
      {/* All Collections
      <Button onClick={() => fnFetchCollections(activePage)}>
        All Collections
      </Button> */}
      <Group
        id="testId"
        mt="md"
        justify="space-around"
        align="middle"
        wrap="wrap"
      >
        {allCollections.length > 0 ?
          allCollections?.map((collection) => {
            return (
              <>
                <Card w={320} shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <img
                      className="h-fit w-full"
                      src={collection?.imageURL || collection?.ipfsLink}
                      // height={32}
                      alt={collection?.title}
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{collection?.title}</Text>
                    <Group>
                      <Badge color="pink">ID : {collection?.id}</Badge>
                      <Badge color="orange">
                        TOKEN ID : {collection?.tokenId}
                      </Badge>
                      {/* <Badge color="pink">{collection?.edition}</Badge> */}
                      <Badge color="purple">
                        COLLECTION ID : {collection?.collectionId}
                      </Badge>
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
                      {new Date(collection?.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Card>
              </>
            );
          }): <Loader />}
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

export default CollectionsPage;
