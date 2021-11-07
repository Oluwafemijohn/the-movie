import React, { useCallback, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import YoutubePlayer from "react-native-youtube-iframe";
import Route from "../navigation/Route";

function TrailersScreen(props: any) {
  const videoKey = props.route.params;

  const [playing, setPlaying] = useState(true);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      togglePlaying();
      props.navigation.navigate(Route.MOVIE_DETAILS_SCREEN);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={videoKey!}
        onChangeState={onStateChange}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={togglePlaying}>
          <Text style={styles.buttonText}>{playing ? "pause" : "play"}</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => {
            props.navigation.navigate(Route.MOVIE_DETAILS_SCREEN);
          }}
        >
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: 100,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    backgroundColor: "blue",
    padding: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
  },
});

export default TrailersScreen;
