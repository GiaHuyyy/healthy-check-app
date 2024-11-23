import { Client, Databases, Query } from "react-native-appwrite";
import { config } from "./config";

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);
const databases = new Databases(client);

// Get nutrition data
export const getNutritonData = async (userId) => {
  try {
    const nutriData = await databases.listDocuments(config.databaseId, config.nutritionCollectionId, [
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
