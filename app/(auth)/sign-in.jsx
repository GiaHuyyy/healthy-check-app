import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import Icons from "../../constants/icons";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="mt-20 px-5">
          <Text className="text-center font-obold700 text-[32px] leading-[48px]">Welcome back 👋</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            containerStyles="mt-[40px]"
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

          <TouchableOpacity>
            <Text className="mt-5 text-right text-secondary">Forgot password?</Text>
          </TouchableOpacity>
          <CustomButton
            title="Sign in"
            containerStyles="bg-[#535CE8] mt-6"
            textStyles="text-white"
            handlePress={() => {
              router.push("/overview");
            }}
          />
          <Text className="mt-8 text-center font-lbold700 text-xs text-[#6E7787]">OR LOGIN IN WITH</Text>
          <View className="mt-4 flex-row justify-center">
            <TouchableOpacity className="px-[14px]">
              <Icons.Google />
            </TouchableOpacity>
            <TouchableOpacity className="px-[14px]">
              <Icons.Facebook />
            </TouchableOpacity>
            <TouchableOpacity className="px-[14px]">
              <Icons.Apple />
            </TouchableOpacity>
          </View>
          <View className="mt-8 flex-row justify-center">
            <Text className="text-primary">Don't have an account?</Text>
            <TouchableOpacity>
              <Link href="/sign-up" className="text-secondary">
                {" "}
                Sign up
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
