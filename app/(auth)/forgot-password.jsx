import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import Icons from "../../constants/icons";
import CustomButtonBack from "../../components/CustomButtonBack";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <CustomButtonBack handlePress={() => router.back("/sign-in")} />
        <View className="mt-10 px-5">
          <Text className="text-center font-obold700 text-[32px] leading-[48px] text-primary">
            Forgot Password
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            containerStyles="mt-[40px]"
            placeholder={"Enter email"}
            keyboardType="email-address"
          />

          <CustomButton
            title="Next"
            containerStyles="bg-[#535CE8] mt-6"
            textStyles="text-white"
            handlePress={() => {
              router.push("/make-selection");
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

export default ForgotPassword;
