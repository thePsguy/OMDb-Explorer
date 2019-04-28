import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ListingCard from '../components/ListingCard';
import Keys from '../constants/Keys';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      apiKey: Keys.apiKey,
      showKeys: ['tt0386676', "tt1266020", "tt4955642"],
    };
  }

  handleCardPress = (key, event) => {
    this.props.navigation.navigate('TitleDetail', {
      imdbID: key,
      season: 1
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.state.showKeys.map((key, index) => {
            return (
            <TouchableOpacity key={key} onPress={(e) => this.handleCardPress(key, e)}>
              <ListingCard imdbID={key} />
            </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0a0a',
    // backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
    opacity: 1,
  },
});
