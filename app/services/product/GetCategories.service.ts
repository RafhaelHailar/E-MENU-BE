import prisma from "@/../prisma";

async function GetCategoriesService() {
  const categories = await prisma.productCategory.findMany({});

  return categories;
}

export default GetCategoriesService;
