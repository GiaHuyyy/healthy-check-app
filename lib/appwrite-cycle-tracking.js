import { Client, Databases, Query } from "react-native-appwrite";
import { config } from "./config";

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);
const databases = new Databases(client);

// Get cycle tracking data
export const getCycleTrackingData = async (userId) => {
  try {
    const cycleTrackingData = await databases.listDocuments(
      config.databaseId,
      config.cycleTrackingCollectionId,
      [Query.equal("creator", userId)],
    );
    const daysData = cycleTrackingData.documents[0];
    return daysData;
  } catch (error) {
    console.error("Error fetching cycle tracking data:", error);
    throw new Error(error);
  }
};

// Update cycle tracking data
export const updateCycleTrackingData = async (cycleTrackingId, updatedData) => {
  try {
    const updatedCycleTrackingData = await databases.updateDocument(
      config.databaseId,
      config.cycleTrackingCollectionId,
      cycleTrackingId,
      {
        days: JSON.stringify(updatedData),
      },
    );

    return updatedCycleTrackingData;
  } catch (error) {
    throw new Error(error);
  }
};
