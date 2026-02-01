import Fontisto from '@expo/vector-icons/Fontisto';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const icons = {
	Clouds: 'cloudy',
	Clear: 'day-sunny',
	Atmosphere: '',
	Snow: 'snow',
	Rain: 'rains',
	Drizzle: 'rain',
	Thunderstorm: 'lightning',
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
	const [city, setCity] = useState('Loading...');
	const [days, setDays] = useState<unknown[]>([]);
	const [location, setLocation] = useState();
	const [ok, setOk] = useState(true);

	const getWeather = async () => {
		const { granted } = await Location.requestForegroundPermissionsAsync();

		if (!granted) {
			setOk(false);
		}

		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync({ accuracy: 5 });

		const location = await Location.reverseGeocodeAsync({
			latitude,
			longitude,
		});
		setCity(location[0]?.city ?? 'Loading...');

		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
		);
		const json = await response.json();

		if (json?.list?.length > 0) {
			setDays(json.list ?? []);
		}
	};

	useEffect(() => {
		getWeather();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>{city}</Text>
			</View>
			<ScrollView
				pagingEnabled
				indicatorStyle='black'
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.contentContainer}
				horizontal>
				{days?.length === 0 ? (
					<View>
						<ActivityIndicator size='small' color='#0000ff' />
					</View>
				) : (
					days.map((day, idx) => (
						<View key={idx} style={styles.day}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
									width: '100%',
								}}>
								<Text style={styles.temp}>
									{parseFloat(day?.main.temp ?? '-').toFixed(1)}
								</Text>
								<Fontisto
									name={icons[day.weather[0].main as keyof typeof icons]}
									size={60}
									color='black'
								/>
							</View>

							<Text style={styles.description}>{day.weather[0].main}</Text>
							<Text style={styles.tinyText}>{day.weather[0].description}</Text>
						</View>
					))
				)}
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
		alignItems: 'center',
	},
	cityName: {
		fontSize: 68,
		fontWeight: '500',
	},
	contentContainer: {
		backgroundColor: 'orange',
	},
	day: {
		width: SCREEN_WIDTH,
		alignItems: 'flex-start',
		gap: 10,
		paddingInline: 16,
	},
	temp: {
		marginTop: 50,
		fontSize: 120,
		fontWeight: 700,
	},
	description: {
		marginTop: -30,
		fontSize: 40,
		fontWeight: 600,
	},
	tinyText: {
		fontSize: 20,
	},
});
