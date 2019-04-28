import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ListingCard from '../components/ListingCard';
import Keys from '../constants/Keys';
const axios = require('axios');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      apiKey: Keys.apiKey,
      imdbKeys: ['tt0386676', "tt1266020", "tt4955642"],
      searchText: ""
    };
  }

  handleCardPress = (key, event) => {
    this.props.navigation.navigate('TitleDetail', {
      imdbID: key,
      season: 1
    })
  };

  searchOMDb = (searchText) => {
    let requestParams = {};
    requestParams[Keys.params.apiKey] = Keys.apiKey;
    requestParams[Keys.params.searchQuery] = searchText;
    let self = this;
    axios.get(Keys.baseUrl, {
      params: requestParams
    })
      .then(function (response) {
        let imdbKeys = [];
        response.data.Search && response.data.Search.map(item => {
          imdbKeys.push(item.imdbID)
        });
        self.setState({imdbKeys})
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchText}
          onChangeText={(searchText) => this.setState({searchText})}
          onSubmitEditing={(e) => this.searchOMDb(e.nativeEvent.text)}
          value={this.state.searchText}
          placeholder={"Search OMDb"}
          placeholderTextColor={"#eaeaea"}
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {this.state.imdbKeys.map((key, index) => {
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
  searchText: {
    color: '#fff',
    height: 40,
    width: '100%',
    marginTop: 30,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 10
  }
});
