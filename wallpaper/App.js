import React from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList, Dimensions, Image } from 'react-native';
import axios from 'axios';

const {height,width} = Dimensions.get('window')
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      images: []
    };
    this.loadWallpapers = this.loadWallpapers.bind(this);
    this.renderItem = this.renderItem.bind(this)
  }

  loadWallpapers() {
    axios.get('http://api.unsplash.com/photos/random?count=30&clienet_id=4e95d19e8a234525f3e0199a5535fd36bc7790f70063b5b6b7b5a846e376ce17')
    .then((response) => {
      console.log(response.data);
      this.setState({ images: response.data, isLoading: false });
    }).bind(this)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      console.log('request completed');
    });
  }
    componentDidMount() {
      this.loadWallpapers();
    }
    renderItem(image) {
      return(
        <View style={{ height, width }}>
          <Image
              style={{ flex: 1, height: null, width: null }}
              source={{ uri: image.urls.regular }}
              resizeMode="cover"
         />
       </View>
  }
  render() {
  return this.state.isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="grey" />
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
            <FlatList
            horizontal
            pagingEnabled
            data={this.state.images}
            renderItem={(({item})=>this.renderItem(item))}
            keyExtractor={item => item.id}
          />
            </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',

  },
});
