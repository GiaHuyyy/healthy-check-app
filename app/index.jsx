import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Redirect, router } from "expo-router";
import Icons from "../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../constants/images";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/overview" />;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 bg-[#535CE8] pb-[53px]">
          <Image source={Images.hero} className="w-full rounded-bl-full" />
          <View className="px-[37px]">
            <View className="h-[58px] w-[58px] items-center justify-center rounded-full bg-white">
              <Icons.Logo className="h-16 w-16" />
            </View>
            <Text className="mt-6 w-[280px] font-osemibold600 text-[32px] leading-[48px] text-white">
              Let's start your health journey today with us!
            </Text>
          </View>
          <CustomButton
            title="Continue"
            handlePress={() => router.push("/sign-in")}
            containerStyles="bg-white mt-11 mx-[21px]"
            textStyles="text-primary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
