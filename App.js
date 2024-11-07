import RootLayout from "./app/_layout";
import { Stack } from "expo-router";
import NewCredentials from "./app/(auth)/new-credentials";

export default function App() {
  return (
    <Stack>
      <RootLayout />
      <Stack.Screen name="new-credentials" component={NewCredentials} />
    </Stack>
  );
}
