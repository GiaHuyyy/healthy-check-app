import React from "react";
import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import CustomDrawerContent from "../../components/CustomDrawerContent";
const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerPosition: "right",
          headerShown: false,
          drawerStyle: {
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            width: 300,
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="(tabs)" options={{ headerShown: false, drawerLabel: () => null }} />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
