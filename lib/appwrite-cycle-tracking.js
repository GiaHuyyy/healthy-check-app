import { Client, Databases, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.healthcheckapp",
  projectId: "66f6cb0b000f8621b904",
  databaseId: "66f6ce62001a707aabe8",
  cycleTrackingCollectionId: "67315f620026ae325d0e",
};

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
    // Chuyển đổi chuỗi JSON thành mảng đối tượng
    const daysData = JSON.parse(cycleTrackingData.documents[0].days);
    return daysData;
  } catch (error) {
    console.error("Error fetching cycle tracking data:", error);
    throw new Error(error);
  }
};
