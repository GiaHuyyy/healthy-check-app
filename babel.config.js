const fs = require("fs");
const path = require("path");

module.exports = function (api) {
  // Ensure changes to .env.development invalidate Metro/Babel transform cache.
  // Without this, updating the key can require `expo start -c` to take effect.
  const envPath = path.join(__dirname, ".env.development");
  api.cache.using(() => (fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : ""));
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env.development", // Chỉ định tệp .env
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      "react-native-reanimated/plugin", // Luôn đặt cuối cùng nếu bạn dùng reanimated
    ],
  };
};
