import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtonBack from "../components/CustomButtonBack";
import { router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import Icons from "../constants/icons";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser, updateUserAccount, updateUserInfo } from "../lib/appwrite";

const Profile = () => {
  const { user, setUser } = useGlobalContext();
  const [form, setForm] = useState({
    username: user?.username,
    email: user?.email,
    password: user?.password,
    avatar: user?.avatar,
  });

  const currentEmail = user?.email;
  const oldPassword = user?.password;

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setForm({ ...form, avatar: pickerResult.assets[0].uri });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const updatedData = {
        username: form.username,
        email: form.email,
        avatar: form.avatar,
        password: form.password,
      };

      await updateUserInfo(user.$id, updatedData);
      await updateUserAccount(updatedData, oldPassword, currentEmail);

      alert("Profile updated");
      router.replace("");

      const result = await getCurrentUser();
      setUser(result);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-[#121212]">
      <ScrollView>
        <CustomButtonBack handlePress={() => router.back()} title="Bio-data" />
        <View className="mt-10 px-5">
          <View className="items-center">
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={{ uri: form.avatar }}
                resizeMode="contain"
                className="h-[90px] w-[90px] rounded-full"
              />
              <Icons.Camera className="absolute -bottom-2 -right-2" />
            </TouchableOpacity>
            <View className="mt-2">
              <Text className="font-osemibold600 text-[16px] text-gray-900 dark:text-[#eeedf7]">
                {user?.username}
              </Text>
              <Text className="mt-[2px] font-lregular400 text-xs text-gray-400">@{user?.username}</Text>
            </View>
          </View>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            containerStyles="mt-[20px]"
            placeholder={"Enter username"}
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            containerStyles="mt-[17px]"
            placeholder={"Enter email"}
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder={"Enter password"}
            containerStyles="mt-[17px]"
          />

          <FormField
            title="Avatar"
            value={form.avatar}
            handleChangeText={(e) => setForm({ ...form, avatar: e })}
            placeholder={"Enter avatar"}
            containerStyles="mt-[17px]"
          />

          <CustomButton
            title="Update"
            containerStyles="bg-[#535CE8] mt-6"
            textStyles="text-white"
            handlePress={() => handleUpdateProfile()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
