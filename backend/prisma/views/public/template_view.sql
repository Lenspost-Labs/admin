SELECT
  id,
  data,
  name,
  image,
  "createdAt",
  "updatedAt",
  tags
FROM
  templates
ORDER BY
  "createdAt" DESC
LIMIT
  20;