import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors } from '@utils';

const SlideShow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);


    useEffect(() => {
        const timer = setInterval(() => {
            handleNext()
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [currentIndex, images]);

    const handleNext = () => {
        // if (currentIndex < images.length -1) {
        //   setCurrentIndex(currentIndex + 1);
        //   flatListRef.current.scrollToIndex({ index: currentIndex + 1 });

        // }
        // if (currentIndex == images.length - 1) {
        //   setCurrentIndex(0)
        //   flatListRef.current.scrollToIndex({ index: currentIndex });
        // }
        if (currentIndex + 1 >= images.length) {
            setCurrentIndex(0)
            flatListRef.current.scrollToIndex({ index: currentIndex });
        } else {
            setCurrentIndex(currentIndex + 1)
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image style={styles.image} source={{ uri: item }} />
        </View>
    );




    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const slideIndex = Math.floor(
                        event.nativeEvent.contentOffset.x /
                        event.nativeEvent.layoutMeasurement.width
                    );
                    setCurrentIndex(slideIndex);
                }}
            />
        </View>
    );
};

export default SlideShow;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        width: WINDOW_WIDTH - 40,
        height: 100,
        borderRadius:15
    },
    image: {
        width: "100%",
        height: 100,
        resizeMode: "cover",
        borderRadius:15
    },
    controls: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#ccc",
        marginHorizontal: 5,
    },
})