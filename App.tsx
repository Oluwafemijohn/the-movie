import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import MovieCard from "./app/components/MovieCard";
import SafeAreaScreen from "./app/components/SafeAreaScreen";
import AppNavigation from "./app/navigation/AppNavigation";
import MovieListScreen from "./app/screens/MovieListScreen";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaScreen>
          <AppNavigation />
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
});
