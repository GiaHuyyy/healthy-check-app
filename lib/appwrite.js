import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.healthcheckapp",
  projectId: "66f6cb0b000f8621b904",
  databaseId: "66f6ce62001a707aabe8",
  userCollectionId: "66f6ce9a0016f90f6f26",
  storerageId: "66f6d07d001cf6ef3bc8",
};

const client = new Client();
client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register a user
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw new Error("Failed to create user");
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(config.databaseId, config.userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
      password,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Sign in a user
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

// Sign out a user
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

// Check if email exists
export const checkEmailExists = async (email) => {
  try {
    const users = await databases.listDocuments(config.databaseId, config.userCollectionId, [
      Query.equal("email", email),
    ]);

    if (users.documents.length === 0) {
      throw new Error("Email does not exist");
    }

    return users.documents[0];
  } catch (error) {
    throw new Error(error);
  }
};

// Request password recovery
export const requestPasswordRecovery = async (email) => {
  try {
    await account.createRecovery(email, "http://localhost:8081/new-credentials"); // Wifi
    // await account.createRecovery(email, 'http://192.168.173.9:8081/new-credentials'); // 4G
  } catch (error) {
    throw new Error(error);
  }
};

// Complete password reset
export const completePasswordReset = async (userId, secret, newPassword, confirmPassword) => {
  try {
    await account.updateRecovery(userId, secret, newPassword, confirmPassword);
  } catch (error) {
    throw new Error(error);
  }
};

// Update user information
export const updateUserInfo = async (userId, updatedData) => {
  try {
    const { username, email, avatar, password } = updatedData;
    const updatedUser = await databases.updateDocument(config.databaseId, config.userCollectionId, userId, {
      username,
      email,
      avatar,
      password,
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Update user account
export const updateUserAccount = async (updatedData, oldPassword, currentEmail) => {
  try {
    const { username, email, password } = updatedData;

    if (username) {
      await account.updateName(username);
    }
    if (email !== currentEmail) {
      await account.updateEmail(email, oldPassword);
    }
    if (password) {
      await account.updatePassword(password, oldPassword);
    }
  } catch (error) {
    throw new Error(error);
  }
};
