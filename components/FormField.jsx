import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icons from "../constants/icons";

const FormField = ({ title, value, placeholder, handleChangeText, containerStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${containerStyles}`}>
      <Text className="font-lbold700 text-base leading-[26px] text-[#424955]">{title}</Text>

      <View className="h-[43px] flex-row items-center rounded-2xl bg-[#e5e5e6] px-4">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#BCC1CA"}
          onChangeText={handleChangeText}
          className="flex-1 font-lregular400 text-base leading-[26px] text-primary"
          secureTextEntry={
            (title === "Password" && !showPassword) || (title === "Repeat Password" && !showPassword)
          }
          {...props}
        />

        {(title === "Password" || title === "Repeat Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icons.Eye className="h-5 w-5" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
