import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import Icons from "../../constants/icons";
import CustomButtonBack from "../../components/CustomButtonBack";

const NewCredentials = () => {
  const [form, setForm] = useState({
    password: "",
    repeatpassword: "",
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <CustomButtonBack handlePress={() => router.back("/index")} />
        <View className="mt-10 px-5">
          <View className="items-center">
            <Icons.ResetPass />
          </View>
          <Text className="text-center font-obold700 text-[32px] leading-[48px] text-primary">
            New Credentials
          </Text>
          <View className="items-center">
            <Text className="w-[230px] text-center font-lregular400 text-xs text-primary">
              Your identity has been verified ,Now you can change passcode
            </Text>
          </View>
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder={"Enter password"}
            containerStyles="mt-[40px]"
          />

          <FormField
            title="Repeat Password"
            value={form.repeatpassword}
            handleChangeText={(e) => setForm({ ...form, repeatpassword: e })}
            placeholder={"Repeat password"}
            containerStyles="mt-[17px]"
          />

          <CustomButton
            title="Update"
            containerStyles="bg-[#535CE8] mt-6"
            textStyles="text-white"
            handlePress={() => {
              router.push("/updated");
            }}
          />
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

export default NewCredentials;
