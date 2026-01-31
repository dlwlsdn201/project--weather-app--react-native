import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Ulsan</Text>
      </View>
      <ScrollView pagingEnabled indicatorStyle='black' showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contentContainer} horizontal>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  city: {
    flex: 1.2,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
  },
  cityName: {
    fontSize: 68,
  },
  contentContainer: {
    backgroundColor: 'orange',
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 178,
  },
  description: {
    marginTop: -30,
    fontSize: 60,
  },
});
