import { Client, Databases, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.healthcheckapp",
  projectId: "66f6cb0b000f8621b904",
  databaseId: "66f6ce62001a707aabe8",
  stepsCollectionId: "674154d000099b07c1d9",
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);
const databases = new Databases(client);

// Get steps data
export const getStepsData = async (userId) => {
  try {
    const stData = await databases.listDocuments(config.databaseId, config.stepsCollectionId, [
      Query.equal("creator", userId),
    ]);
    const stepsData = stData.documents[0];
    return stepsData;
  } catch (error) {
    console.error("Error fetching steps data:", error);
    throw new Error(error);
  }
};

// Update steps data
// export const updateStepsData = async (stepsId, updatedData) => {
//   try {
//     const updatedStepsData = await databases.updateDocument(
//       config.databaseId,
//       config.sleepCollectionId,
//       stepsId,
//       {
//         steps: JSON.stringify(updatedData),
//       },
//     );

//     return updatedStepsData;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
