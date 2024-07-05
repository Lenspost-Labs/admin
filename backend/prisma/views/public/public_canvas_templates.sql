SELECT
  id,
  data,
  params,
  "isPublic",
  "ipfsLink",
  "imageLink",
  "createdAt",
  "updatedAt",
  "ownerAddress",
  "referredFrom",
  "isGated",
  "allowList",
  "gatedWith",
  "assetsRecipientElementData",
  "ownerId",
  tags
FROM
  canvases
WHERE
  ("isPublic" = TRUE)
ORDER BY
  "createdAt" DESC;