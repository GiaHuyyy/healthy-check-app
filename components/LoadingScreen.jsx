import React, { useEffect } from "react";
import { View, ActivityIndicator, Modal, Text } from "react-native";
import { useRouter } from "expo-router";

const LoadingScreen = ({ redirectTo, title }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace(redirectTo);
    }, 3000);

    return () => clearTimeout(timer);
  }, [redirectTo, router]);

  return (
    <Modal animationType="fade" transparent={false} visible onRequestClose={() => {}}>
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="mt-1 font-omedium500 text-lg text-primary">{title}</Text>
      </View>
    </Modal>
  );
};

export default LoadingScreen;
