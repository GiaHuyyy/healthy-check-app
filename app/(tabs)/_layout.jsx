import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

import Icons from "../../constants/icons";

const TabIcon = ({ Icon, name, focused }) => {
  return (
    <View className="items-center justify-center">
      {name === "Sharing" ? (
        <Icon className="h-6 w-6" fill={`${focused ? "#535CE8" : "#565E6C"}`} />
      ) : (
        <Icon className="h-6 w-6" stroke={`${focused ? "#535CE8" : "#565E6C"}`} />
      )}
      <Text
        className={`text-xs ${focused ? "font-lbold700 text-secondary" : "font-lregular400 text-[#565E6C]"}`}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 64,
          shadowColor: "#171A1F",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5, // hỗ trợ box-shadow trên Android
        },
      }}
    >
      <Tabs.Screen
        name="overview"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon Icon={Icons.Overview} name="Overview" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon Icon={Icons.Explore} name="Explore" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="sharing"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon Icon={Icons.Sharing} name="Sharing" focused={focused} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
