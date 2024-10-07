import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Switch, Modal } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useGlobalContext } from "../context/GlobalProvider";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "../lib/appwrite";
import LoadingScreen from "./LoadingScreen";

const CustomDrawerContent = (props) => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [isOnline, setIsOnline] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
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

  return (
    <DrawerContentScrollView {...props}>
      {/* User Profile Section */}
      <View className="flex-row items-center pl-5 pt-5">
        <Image
          source={{ uri: user?.avatar }}
          resizeMode="contain"
          className="h-[44px] w-[44px] rounded-full"
        />
        <View className="ml-2">
          <Text className="font-osemibold600 text-[16px] text-gray-900">{user?.username}</Text>
          <Text className="font-lregular400 text-xs text-gray-400">@{user?.username}</Text>
        </View>
      </View>

      {/* Divider */}
      <View className="mb-2 mt-5 h-[1px] w-full bg-gray-200" />

      {/* Drawer Items */}
      <View className="pl-5 pr-1">
        <TouchableOpacity className="h-11 flex-row items-center">
          <Ionicons name="person-outline" size={20} color="#9CA3AF" />
          <Text className="ml-3 font-lregular400 text-base text-gray-900">Profile</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="h-11 flex-row items-center">
            <Ionicons name="eye-outline" size={20} color="#9CA3AF" />
            <Text className="ml-3 font-lregular400 text-base text-gray-900">Show Online Status</Text>
          </TouchableOpacity>
          <Switch
            value={isOnline}
            onValueChange={(value) => setIsOnline(value)}
            thumbColor={isOnline ? "#1DD75B" : "#f4f3f4"}
            trackColor={{ false: "#d6d9de", true: "#bef0cb" }}
          />
        </View>

        <TouchableOpacity className="h-11 flex-row items-center">
          <Ionicons name="stats-chart-outline" size={20} color="#9CA3AF" />
          <Text className="ml-3 font-lregular400 text-base text-gray-900">My Stats</Text>
        </TouchableOpacity>

        <TouchableOpacity className="h-11 flex-row items-center">
          <Ionicons name="wallet-outline" size={20} color="#9CA3AF" />
          <Text className="ml-3 font-lregular400 text-base text-gray-900">Payments</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="mt-2 h-[1px] w-full bg-gray-200" />

        <TouchableOpacity className="h-11 flex-row items-center">
          <Ionicons name="settings-outline" size={20} color="#9CA3AF" />
          <Text className="ml-3 font-lregular400 text-base text-gray-900">Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity className="h-11 flex-row items-center">
          <Ionicons name="language-outline" size={20} color="#9CA3AF" />
          <Text className="ml-3 font-lregular400 text-base text-gray-900">Language</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between">
          <TouchableOpacity className="h-11 flex-row items-center">
            <Ionicons name="moon-outline" size={20} color="#9CA3AF" />
            <Text className="ml-3 font-lregular400 text-base text-gray-900">Dark Mode</Text>
          </TouchableOpacity>
          <Switch
            value={isDarkMode}
            onValueChange={(value) => setIsDarkMode(value)}
            thumbColor={isDarkMode ? "#1DD75B" : "#f4f3f4"}
            trackColor={{ false: "#d6d9de", true: "#bef0cb" }}
          />
        </View>

        {/* Divider */}
        <View className="mt-2 h-[1px] w-full bg-gray-200" />

        <TouchableOpacity className="h-11 flex-row items-center">
          <Ionicons name="help-circle-outline" size={20} color="#9CA3AF" />
          <Text className="ml-3 font-lregular400 text-base text-gray-900">Help</Text>
        </TouchableOpacity>

        <TouchableOpacity className="h-11 flex-row items-center">
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#9CA3AF" />
          <Text className="ml-3 font-lregular400 text-base text-gray-900">Community & Forums</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="mt-2 h-[1px] w-full bg-gray-200" />
        {/* Logout Button */}
        <TouchableOpacity className="h-11 flex-row items-center" onPress={() => setModalVisible(true)}>
          <Ionicons name="log-out-outline" size={20} color="red" />
          <Text className="ml-3 font-lregular400 text-base text-red-500">Logout</Text>
        </TouchableOpacity>

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
