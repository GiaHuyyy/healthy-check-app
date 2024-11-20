import { Platform } from "react-native";
import * as Share from "expo-sharing";
import * as FileSystem from "expo-file-system";

export const CustomShareContent = async () => {
  try {
    if (Platform.OS === "web") {
      const url = "https://www.example.com/sample.pdf";
      const message = `Keep your health in check\nKeep loved ones informed about your condition.\n\nStay protected\nProtect yourself and others with timely health checks.\n\nReceive notifications\nGet notified for health updates and actions to take.\n\nDownload file here: ${url}`;
      await navigator.share({
        title: "Share PDF with Message",
        text: message,
        url: url,
      });
    } else {
      const isAvailable = await Share.isAvailableAsync();
      if (!isAvailable) {
        alert("Sharing is not available on this device");
        return;
      }

      const url = "https://www.example.com/sample.pdf";

      // Tải tệp xuống thiết bị
      const fileUri = `${FileSystem.cacheDirectory}sample.pdf`;
      await FileSystem.downloadAsync(url, fileUri);

      // Chuỗi nội dung từ các SharingItem
      const itemsToShare = [
        { title: "Keep your health in check", des: "Keep loved ones informed about your condition." },
        { title: "Stay protected", des: "Protect yourself and others with timely health checks." },
        { title: "Receive notifications", des: "Get notified for health updates and actions to take." },
      ];
      const message = itemsToShare.map((item) => `${item.title}\n${item.des}`).join("\n\n");

      // Chia sẻ tệp cục bộ kèm theo nội dung từ SharingItem
      await Share.shareAsync(fileUri, {
        dialogTitle: "Share PDF with Message",
        mimeType: "application/pdf",
        UTI: "com.adobe.pdf", // Định dạng tệp PDF cho iOS
        message: `${message}\n\nDownload file here: ${url}`,
      });
    }
  } catch (error) {
    console.log("Error =>", error);
  }
};
