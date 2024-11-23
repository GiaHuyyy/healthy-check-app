import {
  REACT_APP_APPWRITE_ENDPOINT,
  REACT_APP_APPWRITE_PLATFORM,
  REACT_APP_APPWRITE_PROJECT_ID,
  REACT_APP_APPWRITE_DATABASE_ID,
  REACT_APP_APPWRITE_USER_COLLECTION_ID,
  REACT_APP_APPWRITE_STEPS_COLLECTION_ID,
  REACT_APP_APPWRITE_CYCLE_TRACKING_COLLECTION_ID,
  REACT_APP_APPWRITE_SLEEP_COLLECTION_ID,
  REACT_APP_APPWRITE_NUTRITION_COLLECTION_ID,
} from "@env";

export const config = {
  endpoint: REACT_APP_APPWRITE_ENDPOINT,
  platform: REACT_APP_APPWRITE_PLATFORM,
  projectId: REACT_APP_APPWRITE_PROJECT_ID,
  databaseId: REACT_APP_APPWRITE_DATABASE_ID,
  userCollectionId: REACT_APP_APPWRITE_USER_COLLECTION_ID,
  stepsCollectionId: REACT_APP_APPWRITE_STEPS_COLLECTION_ID,
  cycleTrackingCollectionId: REACT_APP_APPWRITE_CYCLE_TRACKING_COLLECTION_ID,
  sleepCollectionId: REACT_APP_APPWRITE_SLEEP_COLLECTION_ID,
  nutritionCollectionId: REACT_APP_APPWRITE_NUTRITION_COLLECTION_ID,
};