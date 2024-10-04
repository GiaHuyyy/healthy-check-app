import React from "react";
import { Stack } from "expo-router";
const OverviewLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="all-data" options={{ headerShown: false }} />
      <Stack.Screen name="nutrition" options={{ headerShown: false }} />
      <Stack.Screen name="steps" options={{ headerShown: false }} />
      <Stack.Screen name="sleep" options={{ headerShown: false }} />
      <Stack.Screen name="cycle-tracking" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OverviewLayout;
