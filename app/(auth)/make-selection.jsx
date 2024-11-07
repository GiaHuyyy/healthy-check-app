import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams, router } from "expo-router";

import Icons from "../../constants/icons";
import CustomButtonBack from "../../components/CustomButtonBack";
import { requestPasswordRecovery } from "../../lib/appwrite";

const MakeSelection = () => {
  const { email } = useLocalSearchParams();

  const handleSelectSent = async () => {
    try {
      await requestPasswordRecovery(email);
      alert("Password recovery email sent. Please check your inbox.");
      router.push("/sign-in");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <CustomButtonBack handlePress={() => router.replace("/sign-in")} />
        <View className="mt-10 px-14">
          <Text className="text-center font-obold700 text-[32px] leading-[48px] text-primary">
            Make Selection
          </Text>
          <View className="items-center">
            <Text className="w-[230px] text-center font-lregular400 text-xs text-primary">
              Select which contact detail should use to reset your password
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSelectSent}
            className="mt-8 min-h-[100px] w-full flex-row items-center justify-between rounded-2xl bg-[#d9d9d9] px-5"
          >
            <View className="flex-row items-center">
              <Icons.Phone />
              <View>
                <Text className="ml-3 text-xs text-[#959595]">Via SMS</Text>
                <Text className="ml-3 font-lblack900 text-sm text-primary">+91 70103 66942</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSelectSent}
            className="mt-8 min-h-[100px] w-full flex-row items-center justify-between rounded-2xl bg-[#d9d9d9] px-5"
          >
            <View className="flex-row items-center">
              <Icons.Email />
              <View>
                <Text className="ml-3 text-xs text-[#959595]">Via Email</Text>
                <Text className="ml-3 font-lblack900 text-sm text-primary">{email}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View className="mt-8 flex-row justify-center">
            <Text className="text-primary">Don't have an account?</Text>
            <Link href="/sign-up" className="text-secondary">
              {" "}
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MakeSelection;
