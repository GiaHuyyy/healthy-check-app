import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import Icons from "../constants/icons";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-[#2828c0]">
      <Text className="font-osemibold600 text-3xl text-[#ccc]">My app</Text>
      <Icons.Logo className="h-20 w-20" />
      <Link href="/overview" style={{ color: "blue" }}>
        Profile
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
