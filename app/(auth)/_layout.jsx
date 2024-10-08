import React from "react";
import { Stack } from "expo-router";
const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="make-selection" options={{ headerShown: false }} />
      <Stack.Screen name="new-credentials" options={{ headerShown: false }} />
      <Stack.Screen name="updated" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
