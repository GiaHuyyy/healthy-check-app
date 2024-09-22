import React from "react";
import { Stack } from "expo-router";

const OverviewLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="all-data" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OverviewLayout;
