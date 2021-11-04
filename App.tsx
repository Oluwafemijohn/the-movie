import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import SafeAreaScreen from "./app/components/SafeAreaScreen";
import AppBottomTab from "./app/navigation/AppBottomTab";
import AppNavigation from "./app/navigation/AppNavigation";
import MovieListScreen from "./app/screens/MovieListScreen";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import showToast from "./app/components/toast";

const queryClient = new QueryClient();
export default function App() {
  // NetInfo.fetch().then(state => {
  //   console.log('Connection type', state);
  // });
  // NetInfo.addEventListener((state) =>  console.log(state) );

  const netInfo = useNetInfo();
  // if (!netInfo.isInternetReachable) {
  //   showToast("No internet, Please check your internet connection");
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaScreen>
          <AppBottomTab />
          {/* {netInfo.isConnected && netInfo.isInternetReachable ? (
          ) : (
            <Text style={styles.noInternetMessage}>
              No internet, Please check your internet connection
            </Text>
          )} */}
        </SafeAreaScreen>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  noInternetMessage: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 100,
    color: "red",
  },
});
