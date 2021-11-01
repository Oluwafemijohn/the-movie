import React from 'react';
import { Text, View } from 'react-native';

function MovieDetailsScreen(props: any) {
    const id  = props.route.params;
    id

    return (
        <View>
            {console.log(id)}
            <Text>Hello</Text>
        </View>
    );
}

export default MovieDetailsScreen;