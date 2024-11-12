import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import EyeIcon from 'react-native-vector-icons/Ionicons';

const SearchScreen = ({navigation}) => {
  const [data, setData] = useState([]);           // State to hold all products data
  const [searchText, setSearchText] = useState('');  // State to hold search input text
  const [filteredData, setFilteredData] = useState([]);  // State to hold filtered data based on search

  const fetchMultipleData = async (ids) => {
    try {
      const apiUrl = 'http://staging.php-dev.in:8844/trainingapp/api/products/getList';

      // Map over the IDs and create a fetch promise for each ID
      const fetchPromises = ids.map(id => {
        const url = `${apiUrl}?product_category_id=${id}`;
        return fetch(url)
          .then(response => response.json())
          .then(data => ({ id, data }))
          .catch(error => ({ id, error }));
      });

      // Wait for all requests to complete
      const results = await Promise.all(fetchPromises);

      const allResults = [];
      results.forEach(result => {
        if (result.error) {
          console.log(`Error fetching data for category ID ${result.id}:`, result.error);
        } else {
          console.log(`Data for category ID ${result.id}:`, result.data);
          allResults.push(...result.data.data);  // Combine all product items into one array
        }
      });

      // Update the state with all results
      setData(allResults);
      setFilteredData(allResults);  // Initially, display all products before filtering
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchData function with multiple IDs
  useEffect(() => {
    fetchMultipleData([1, 2, 3, 4, 5]);  // Example with category IDs 1, 2, and 3
  }, []);

  // Handle search functionality
  const handleSearch = (text) => {
    setSearchText(text);  // Update search text

    // Filter the data based on the search text
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())  // Check if product name contains search text
    );
    
    setFilteredData(filtered);  // Update filtered data
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        value={searchText}
        onChangeText={handleSearch}  // Update search text and filter data on each change
      />

      <FlatList
        data={filteredData}  // Display filtered data based on search
        keyExtractor={(item) => item.product_id ? item.product_id.toString() : item.name || 'default_key'}  // Handle undefined product_id
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.touchable} onPress = {() => navigation.navigate('ProductInfo' , { productId: item.id})}>
              <Image
                source={{ uri: item.product_images }}
                style={styles.itemImage}
                resizeMode='contain'
              />

              <View style={styles.itemDetails}>
                <Text style={styles.producerText}>{item.producer}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.viewCount}>
                  <EyeIcon name='eye' size={20} color='black' />
                  <Text>{item.view_count}</Text>
                </View>
                <View style={styles.rating}>
                  <AirbnbRating
                    count={5}
                    defaultRating={item.rating}
                    size={15}
                    showRating={false}
                  />
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{`₹${item.cost}`}</Text>
                  <Text style={styles.oldPrice}>{`₹${item.cost}`}</Text>
                </View>

                <Text style={styles.description} numberOfLines={1} ellipsizeMode='tail'>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  // Ensures the container takes up full screen space
    paddingBottom: 10  // Adds padding at the bottom to ensure the last item is not cut off
  },
  searchInput: {
    marginHorizontal: 10,
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 20,
    borderRadius: 20,
    padding: 4,
    fontFamily: 'Laila-Medium'
  },
  itemContainer: {
    borderWidth: 0.75,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 20,  // Add margin to create space between items
  },
  touchable: {
    flexDirection: 'row',
  },
  itemImage: {
    height: 100,
    width: 150,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  itemDetails: {
    flexDirection: 'column',
    paddingTop: 5
  },
  producerText: {
    fontFamily: 'Laila-Regular',
  },
  itemName: {
    fontFamily: 'Laila-SemiBold',
  },
  viewCount: {
    flexDirection: 'row',
  },
  rating: {
    alignItems: 'flex-start',
  },
  priceContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  price: {
    color: 'blue',
    fontSize: 16,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    fontSize: 14,
    marginTop: 2,
    marginLeft: 5,
  },
  description: {
    width: 200,
    fontSize: 13,
    marginBottom: 15
  },
});

export default SearchScreen;
