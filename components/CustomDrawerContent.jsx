import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Switch, Modal } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useGlobalContext } from "../context/GlobalProvider";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "../lib/appwrite";
import LoadingScreen from "./LoadingScreen";
import Icons from "../constants/icons";
import { router } from "expo-router";

const CustomDrawerContent = (props) => {
  const { user, setUser, setIsLoggedIn, isOnline, setIsOnline, colorScheme, setColorScheme } =
    useGlobalContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    setIsLogout(true);
  };

  if (isLogout) {
    return <LoadingScreen redirectTo="/sign-in" title="Sign out ..." />;
  }

  const DrawItem = ({ iconName, name, color, handleOnPress }) => {
    return (
      <TouchableOpacity onPress={handleOnPress} className="h-11 flex-row items-center">
        <Ionicons name={iconName} size={20} color={color} />
        <Text
          className={`ml-3 font-lregular400 text-base ${name === "Logout" ? "text-red-500" : "text-gray-900 dark:text-[#9e9da8]"}`}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colorScheme === "dark" ? "#292e39" : "#fff" }}
    >
      {/* User Profile Section */}
      <View className="flex-row items-center pl-5 pt-5">
        <View>
          <Image
            source={{ uri: user?.avatar }}
            resizeMode="contain"
            className="h-[44px] w-[44px] rounded-full"
          />
          <Icons.Status
            className="absolute bottom-[1px] right-[1px]"
            fill={`${isOnline ? "#1DD75B" : "#d6d9de"}`}
          />
        </View>
        <View className="ml-2">
          <Text className="font-osemibold600 text-[16px] text-gray-900 dark:text-[#eeedf7]">
            {user?.username}
          </Text>
          <Text className="font-lregular400 text-xs text-gray-400">@{user?.username}</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="mb-2 ml-5 mt-5 h-[1px] w-full bg-gray-200" />

      {/* Drawer Items */}
      <View className="pl-5 pr-1">
        <DrawItem
          iconName="person-outline"
          name="Profile"
          color="#9CA3AF"
          handleOnPress={() => router.push("/profile")}
        />

        <View className="flex-row items-center justify-between">
          <DrawItem iconName="eye-outline" name="Show Online Status" color="#9CA3AF" />
          <Switch
            value={isOnline}
            onValueChange={(value) => setIsOnline(value)}
            thumbColor={isOnline ? "#1DD75B" : "#f4f3f4"}
            trackColor={{ false: "#d6d9de", true: "#bef0cb" }}
          />
        </View>

        <DrawItem iconName="stats-chart-outline" name="My Stats" color="#9CA3AF" />
        <DrawItem iconName="wallet-outline" name="Payments" color="#9CA3AF" />

        {/* Divider */}
        <View className="mt-2 h-[1px] w-full bg-gray-200" />

        <DrawItem iconName="settings-outline" name="Settings" color="#9CA3AF" />
        <DrawItem iconName="language-outline" name="Language" color="#9CA3AF" />

        <View className="flex-row items-center justify-between">
          <DrawItem
            iconName={colorScheme === "dark" ? "sunny-outline" : "moon-outline"}
            name="Dark Mode"
            color="#9CA3AF"
          />
          <Switch
            value={colorScheme === "dark"}
            onValueChange={(value) => setColorScheme(value ? "dark" : "light")}
            thumbColor={colorScheme === "dark" ? "#1DD75B" : "#f4f3f4"}
            trackColor={{ false: "#d6d9de", true: "#bef0cb" }}
          />
        </View>

        {/* Divider */}
        <View className="mt-2 h-[1px] w-full bg-gray-200" />

        <DrawItem iconName="help-circle-outline" name="Help & Support" color="#9CA3AF" />

        <DrawItem iconName="chatbubble-ellipses-outline" name="Community & Forums" color="#9CA3AF" />

        {/* Divider */}
        <View className="mt-2 h-[1px] w-full bg-gray-200" />
        {/* Logout Button */}
        <DrawItem
          iconName="log-out-outline"
          name="Logout"
          color="red"
          handleOnPress={() => setModalVisible(true)}
        />

        {/* Modal logout */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 items-center justify-center bg-white/50">
            <View className="w-[70%] items-center rounded-lg bg-white p-5 shadow-lg">
              <Text className="mb-4 text-center font-omedium500 text-lg">
                Are you sure you want to logout?
              </Text>
              <View className="w-full flex-row justify-between">
                <TouchableOpacity
                  className="mr-2 rounded-lg bg-blue-500 px-4 py-2"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-center font-omedium500 text-white">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity className="rounded-lg bg-red-500 px-4 py-2" onPress={logout}>
                  <Text className="text-center font-omedium500 text-white">Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
