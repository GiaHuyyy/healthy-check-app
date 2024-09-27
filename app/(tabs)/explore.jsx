import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "../../constants/icons";
import Images from "../../constants/images";
import TitleLink from "../../components/TitleLink";
import BlogItem from "../../components/BlogItem";

const Explore = () => {
  const ForYouItem = ({ thumb, title }) => {
    return (
      <TouchableOpacity className="w-[120px] items-center rounded-2xl bg-[#F1F2FD] py-[14px]">
        <Image source={thumb} />
        <Text className="mt-[7px] font-oregular400 text-base text-primary">{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-8 pt-5">
          {/* Search */}
          <View className="flex-row justify-between">
            <View className="h-[43px] w-[80%] flex-row items-center overflow-hidden rounded-[22px] border border-[#BCC1CA] bg-white pl-4">
              <TouchableOpacity>
                <Icons.Search />
              </TouchableOpacity>
              <TextInput
                style={{ outlineStyle: "none" }}
                placeholder="Search topic"
                placeholderTextColor="#BCC1CA"
                className="h-full w-full pl-2 font-lregular400 text-base text-primary"
              />
            </View>
            <TouchableOpacity>
              <Image source={Images.avatar} resizeMode="contain" className="h-[44px] w-[44px] rounded-full" />
            </TouchableOpacity>
          </View>

          {/* For you */}
          <View>
            <View className="mt-6 flex-row items-center justify-between">
              <Text className="font-osemibold600 text-xl text-primary">For you</Text>
              <TouchableOpacity>
                <Icons.Dots />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
              <View className="flex-row gap-x-5">
                <View>
                  <ForYouItem thumb={Images.foryou01} title="Nutrition" />
                </View>
                <View>
                  <ForYouItem thumb={Images.foryou02} title="Sports" />
                </View>
                <View>
                  <ForYouItem thumb={Images.foryou03} title="Nutrition" />
                </View>
                <View>
                  <ForYouItem thumb={Images.foryou01} title="Nutrition" />
                </View>
                <View>
                  <ForYouItem thumb={Images.foryou02} title="Sports" />
                </View>
                <View>
                  <ForYouItem thumb={Images.foryou03} title="Nutrition" />
                </View>
              </View>
            </ScrollView>

            {/* Newest blogs */}
            <TitleLink title="Newest blogs" />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
              <View className="flex-row items-center gap-x-5">
                <View>
                  <BlogItem
                    thumb={Images.blog01}
                    subtitle="Nutriton"
                    title="More about Apples: Benefits, nutrition, and tips"
                    votes={78}
                  />
                </View>
                <View>
                  <BlogItem
                    thumb={Images.blog02}
                    subtitle="Lifestyle"
                    title="The sience of using time to maximize your health"
                    votes={54}
                  />
                </View>
                <View>
                  <BlogItem
                    thumb={Images.blog03}
                    subtitle="Nutriton"
                    title="The best time to eat breakfast, lunch, and dinner"
                    votes={78}
                  />
                </View>
                <View>
                  <BlogItem
                    thumb={Images.blog04}
                    subtitle="Lifestyle"
                    title="The sience of using time to maximize your health"
                    votes={78}
                  />
                </View>
              </View>
            </ScrollView>

            {/* Collection */}
            <TitleLink title="Collection" />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
              <View className="flex-row items-center gap-x-5">
                <View>
                  <BlogItem
                    thumb={Images.blog01}
                    subtitle="Nutriton"
                    title="More about Apples: Benefits, nutrition, and tips"
                    votes={78}
                  />
                </View>
                <View>
                  <BlogItem
                    thumb={Images.blog02}
                    subtitle="Lifestyle"
                    title="The sience of using time to maximize your health"
                    votes={54}
                  />
                </View>
                <View>
                  <BlogItem
                    thumb={Images.blog03}
                    subtitle="Nutriton"
                    title="The best time to eat breakfast, lunch, and dinner"
                    votes={78}
                  />
                </View>
                <View>
                  <BlogItem
                    thumb={Images.blog04}
                    subtitle="Lifestyle"
                    title="The sience of using time to maximize your health"
                    votes={78}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
