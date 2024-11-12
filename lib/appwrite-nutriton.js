import { Client, Databases, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.healthcheckapp",
  projectId: "66f6cb0b000f8621b904",
  databaseId: "66f6ce62001a707aabe8",
  nutritonCollectionId: "673212310002d4cb9c82",
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);
const databases = new Databases(client);

// Get nutrition data
export const getNutritonData = async (userId) => {
  try {
    const nutriData = await databases.listDocuments(config.databaseId, config.nutritonCollectionId, [
      Query.equal("creator", userId),
    ]);
    const nutritionData = nutriData.documents[0];
    return nutritionData;
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    throw new Error(error);
  }
};

// Update nutrition data
export const updateNutritonData = async (nutritionId, updatedData) => {
  try {
    const updatedCycleTrackingData = await databases.updateDocument(
      config.databaseId,
      config.nutritonCollectionId,
      nutritionId,
      {
        nutritions: JSON.stringify(updatedData),
      },
    );

    return updatedCycleTrackingData;
  } catch (error) {
    throw new Error(error);
  }
};
