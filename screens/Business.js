import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, FlatList, Image, Spinner } from 'native-base';
import { Services } from './Services'
import { Divider } from 'react-native-elements/dist/divider/Divider';


export default function Business() {
    const [newsData, setNewsData] = useState([])
    useEffect(() => {
        Services('Business')
            .then(data => {
                setNewsData(data)
            })
            .catch(error => {
                alert(error)
            })
    }, [])
    return (
        <NativeBaseProvider>
           
            {newsData.length > 1 ? (
                <FlatList
                    data={newsData}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.newsContainer}>
                                <Image
                                    width={550}
                                    height={250}
                                    resizeMode={"cover"}
                                    source={{
                                        uri: item.urlToImage,
                                    }}
                                    alt="Alternate Text"
                                />
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                <Text style={styles.date}>
                                    {item.publishedAt}
                                </Text>
                                <Text style={styles.newsDescription}>
                                    {item.description}
                                </Text>
                            </View>
                            <Divider my={2} bg="#e0e0e0" />
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <View style={styles.spinner}>
                    <Spinner color="danger.400" />
                </View>
            )}
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    newsContainer: {
        padding: 10
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: "600"
    },
    newsDescription: {
        fontSize: 16,
        marginTop: 10
    },
    date: {
        fontSize: 14
    },
    spinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 400
    }
});
