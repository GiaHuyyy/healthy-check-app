import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";

import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import Icons from "../../constants/icons";
import CustomButtonBack from "../../components/CustomButtonBack";
import { signIn } from "../../lib/appwrite";
import { Alert } from "react-native";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsLoggedIn } = useGlobalContext();
  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
    }

    setIsSubmitting(true);
    
    try {
      await signIn(form.email, form.password);
      setIsLoggedIn(true);
      // set it to global state
      router.replace("/overview");
    } catch (error) {
      Alert.alert("Errorrr", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <CustomButtonBack handlePress={() => router.back("/index")} />
        <View className="mt-10 px-5">
          <Text className="text-center font-obold700 text-[32px] leading-[48px] text-primary">
            Welcome back 👋
          </Text>
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

          <Link href="/forgot-password" className="mt-5 text-right text-secondary">
            Forgot password?
          </Link>

          <CustomButton
            title="Sign in"
            containerStyles="bg-[#535CE8] mt-6"
            textStyles="text-white"
            handlePress={submit}
            isLoading={isSubmitting}
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

export default SignIn;
