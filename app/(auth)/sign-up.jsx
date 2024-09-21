import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import Icons from "../../constants/icons";
import CustomButtonBack from "../../components/CustomButtonBack";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <CustomButtonBack handlePress={() => router.back("/sign-in")} />
        <View className="mt-10 px-5">
          <Text className="text-center font-obold700 text-[32px] leading-[48px] text-primary">
            Create Account
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            containerStyles="mt-[40px]"
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

          <TouchableOpacity>
            <Text className="mt-5 text-right text-secondary">Tems & conditons</Text>
          </TouchableOpacity>
          <CustomButton
            title="Sign up"
            containerStyles="bg-[#535CE8] mt-6"
            textStyles="text-white"
            handlePress={() => {
              router.push("/sign-in");
            }}
          />
          <Text className="mt-8 text-center font-lbold700 text-xs text-[#6E7787]">OR REGISTER WITH</Text>
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
            <Text className="text-primary">Already have an account?</Text>
            <Link href="/sign-in" className="text-secondary">
              {" "}
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
