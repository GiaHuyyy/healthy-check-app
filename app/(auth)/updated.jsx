import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import Icons from "../../constants/icons";
import CustomButton from "../../components/CustomButton";

const MakeSelection = () => {
  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="mt-10 px-14">
          <Text className="text-center font-obold700 text-[32px] leading-[48px] text-primary">
            Password Updated
          </Text>

          <View className="items-center">
            <Icons.Approval />
          </View>

          <View className="items-center">
            <Text className="w-[230px] text-center font-lregular400 text-xs text-primary">
              Your password has been updated!
            </Text>
          </View>

          {/* <CustomButton
            title="Sign In Again"
            containerStyles="bg-[#535CE8] mt-6"
            textStyles="text-white"
            handlePress={() => {
              router.push("/sign-in");
            }}
          />

          <View className="mt-8 flex-row justify-center">
            <Text className="text-primary">Don't have an account?</Text>
            <Link href="/sign-up" className="text-secondary">
              {" "}
              Sign up
            </Link>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MakeSelection;
