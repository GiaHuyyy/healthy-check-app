import { Client, Databases, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.healthcheckapp",
  projectId: "66f6cb0b000f8621b904",
  databaseId: "66f6ce62001a707aabe8",
  sleepCollectionId: "673362d600037cad92d8",
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);
const databases = new Databases(client);

// Get sleep data
export const getSleepData = async (userId) => {
  try {
    const slData = await databases.listDocuments(config.databaseId, config.sleepCollectionId, [
      Query.equal("creator", userId),
    ]);
    const sleepData = slData.documents[0];
    return sleepData;
  } catch (error) {
    console.error("Error fetching sleep data:", error);
    throw new Error(error);
  }
};

// Update sleep data
// export const updateSleepData = async (sleepId, updatedData) => {
//   try {
//     const updatedSleepData = await databases.updateDocument(
//       config.databaseId,
//       config.sleepCollectionId,
//       sleepId,
//       {
//         sleeps: JSON.stringify(updatedData),
//       },
//     );

//     return updatedSleepData;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
