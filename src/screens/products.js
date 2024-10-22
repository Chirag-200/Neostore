// import React, { useEffect, useState } from 'react';
// import { Text, View, ActivityIndicator, StyleSheet, Image, Dimensions } from 'react-native';
// import EyeIcon from 'react-native-vector-icons/AntDesign';
// import StarRating from 'react-native-star-rating';

// const Products = () =>{ 
//   return (
//     <View>
//       <Text> HII </Text>
//     </View>
//   )

// }
// export default Products

// const Products = ({ route }) => {
//   const product_id = String(route?.params?.productId); 
//   const [productData, setProductData] = useState(null); 
//   const [loading, setLoading] = useState(true); 
//   const { height, width } = Dimensions.get('screen');

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         const response = await fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${product_id}`);

//         if (!response.ok) {
//           throw new Error("Response Not OK");
//         }

//         const data = await response.json();
//         console.log('API Response:', data);
//         setProductData(data); 
//       } catch (error) {
//         console.error('Failed to fetch product data:', error);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchProductData();
//   }, [product_id]); 

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (!productData) {
//     return <Text>No product data found.</Text>;
//   }

//   const product = productData?.data[0];

//   return (
//     <View style={styles.container}> 
//       {/* <View style={styles.productCard}>
//         <View style={styles.row}>
//           <Image 
//             source={{ uri: product?.product_images }} 
//             style={styles.image} 
//           />
//           <View style={styles.textContainer}>
//             <Text style={styles.producerText}>{product?.producer}</Text>
//             <Text style={styles.title}>{product?.name}</Text>
//             <Text style={styles.description}>{product?.description}</Text>
//             <View style={styles.detailsContainer}>
//               <EyeIcon name='eye' size={22} color="#666" />
//               <Text style={styles.details}>{product?.view_count}</Text>
//             </View>
//             <StarRating
//               disabled={true}
//               maxStars={5}
//               rating={product?.rating || 0} 
//               starSize={20}
//               fullStarColor="#FFD700"
//               emptyStarColor="#CCCCCC"
//             />
//           </View>
//         </View>
//       </View> */}
//       <Text>{"Hiiiii"}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 15,
//   },
//   productCard: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginBottom: 15,
//     padding: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center', 
//   },
//   image: {
//     height: Dimensions.get('screen').height * 0.1,
//     width: Dimensions.get('screen').width * 0.3,
//     marginRight: 15,
//     borderRadius: 5,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   producerText: {
//     fontFamily: 'Laila-Light',
//   },
//   title: {
//     marginTop: 2,
//     fontSize: 18,
//     color: 'black',
//     fontFamily: 'Laila-SemiBold',
//   },
//   description: {
//     marginTop: 5,
//     fontSize: 16,
//     color: 'black',
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   details: {
//     fontSize: 16,
//     color: '#666',
//     marginLeft: 5,
//   },
// });

// export default Products;







// // import React, { useEffect, useState } from 'react';
// // import { Text, View, ActivityIndicator, StyleSheet, Image, Dimensions} from 'react-native';

// // const Products = ({ route }) => {
// //   const product_id = String(route?.params?.productId); 
// //   const [productData, setProductData] = useState(null); 
// //   const [loading, setLoading] = useState(true); 
// //   const {height, width } = Dimensions.get('screen')

// //   useEffect(() => {
// //     const fetchProductData = async () => {
// //       try {
// //         const response = await fetch(`http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${product_id}`);

// //         if (!response.ok) {
// //           throw new Error("Response Not OK");
// //         }

// //         const data = await response.json();
// //         setProductData(data); 
// //         // console.log(data?.data[0]?.name)
// //         console.log(productData.data[0].name)
// //         // console.log(productData?.data[0]?.product_images)
// //         // console.log(productData.data)
// //       } catch (error) {
// //         console.log(error);
// //       } finally {
// //         setLoading(false); 
// //       }
// //     };

// //     fetchProductData();
// //   }, [product_id]); 

// //   if (loading) {
// //     return <ActivityIndicator size="large" color="#0000ff" />;
// //   }

// //   if (!productData) {
// //     return <Text>No product data found.</Text>;
// //   }

// //   return (
// //     <View style = {{backgroundColor: 'white'}}> 
// //           <View style= {{borderWidth:1, margin: 15}}>
// //               <View style={{ flexDirection: 'row' , marginLeft: 20}}>
// //                   <View style={{ alignSelf: 'center', marginTop: 20 }}>
// //                       <Image source={{ uri: productData?.data[0]?.product_images }} style={{ height: height * 0.1, width: width * 0.3 }} />
// //                   </View>
// //                   </View>


// //                   <View style = {{flexDirection:"column"}}>
// //                   <Text style = {{marginLeft: 20}}> LUNA </Text>


// //                   <Text style={{ alignSelf: 'center', marginTop: height * 0.02, fontSize: 18, color: 'black', fontFamily: 'Laila-Regular', marginLeft: width*0.07 }} > {productData?.data[0]?.name}</Text>
// //               </View>
// //               <Text style={{ padding: 10 }}> {productData?.data[0]?.description}</Text>
// //               <Text> {productData?.data[0]?.view_count}</Text>
// //               <Text> {productData?.data[0]?.producer}</Text>
// //               </View>


// //     </View>
// //   );
// // };



// // export default Products;

// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import axios from 'axios';
// import {StarRatingDisplay} from 'react-native-star-rating-widget';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Products = props => {
//   const [output, setoutput] = useState([]);
//   const [page, setPage] = useState(1);

//   const [showSeeMore, setShowSeeMore] = useState(false);

//   console.log('>>>>>output :', output);

//   async function ShowTables() {
//     try {
//       const accessToken = await AsyncStorage.getItem('access_token');
//       console.log("aaaaa",accessToken)


//         let result = await axios.get(
//           `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=1&page=${page}`,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           },
//         );

//         setoutput(prevOutput => [...prevOutput, ...result.data.data]);
//         setPage(prevPage => prevPage + 1);

//         Alert.alert('Error');

//     } catch (error) {
//       console.log(error.response ? error.response.data : error.message);
//     }
//   }

//   useEffect(() => {
//     ShowTables();
//   }, []);

//   return (
//     <View style={{flex: 1, backgroundColor: 'white'}}>
//       <FlatList
//         data={output}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             onPress={() => {
//               if (item.id === 1) {
//                 props.navigation.navigate('TableDetails', {id: item.id});
//               } else if (item.id === 2) {
//                 props.navigation.navigate('ChairDetails', {id: item.id});
//               }
//             }}
//             style={{
//               borderWidth: 1,
//               height: 380,
//               width: 350,
//               marginTop: 30,
//               alignSelf: 'center',
//               borderRadius: 12,
//               backgroundColor: 'white',
//               borderColor: '#ddd',
//               shadowColor: '#000',
//               shadowOffset: {width: 0, height: 2},
//               shadowOpacity: 0.1,
//               shadowRadius: 5,
//               elevation: 4,
//             }}>
//             <Image
//               style={{
//                 height: 150,
//                 width: 250,
//                 alignSelf: 'center',
//                 marginTop: 24,
//               }}
//               source={{uri: item.product_images}}></Image>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 marginTop: 16,
//               }}>
//               <Text
//                 style={{
//                   fontSize: 17,
//                   color: 'black',
//                   fontWeight: 'bold',
//                   textAlign: 'center',
//                   marginBottom: 13,
//                 }}>
//                 {item.name}
//               </Text>

//               <Icon
//                 style={{paddingLeft: 50}}
//                 name="remove-red-eye"
//                 size={21}></Icon>
//               <Text
//                 style={{fontSize: 14, marginLeft: 5, fontWeight: '600'}}>{`${
//                 item.view_count * 0.5
//               }k`}</Text>
//             </View>

//          {/* <View>
//          <StarRatingDisplay
//                style={{alignSelf: 'center'}}
//                starSize={25}
//                rating={item?.rating}>
//                </StarRatingDisplay>
//          </View> */}
//             <Text
//               numberOfLines={2}
//               ellipsizeMode="tail"
//               style={{marginTop: 10, marginHorizontal: 25, fontSize: 16}}>
//               {item.description}
//             </Text>

//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignSelf: 'center',
//                 marginTop: 10,
//               }}>
//               <Text
//                 style={{
//                   color: '#A4A4A4',
//                   fontWeight: 'black',
//                   marginTop: 2,
//                   fontSize: 17,
//                   textDecorationLine: 'line-through',
//                   paddingHorizontal: 10,
//                 }}>{`₹${item.cost}`}</Text>
//               <Text
//                 style={{
//                   color: '#2E6BC6',
//                   fontWeight: 'bold',
//                   fontSize: 19,
//                 }}>{`₹${item.cost}`}</Text>

//               <Text
//                 style={{
//                   paddingHorizontal: 10,
//                   color: '#2E6BC6',
//                   fontWeight: 'bold',
//                   fontSize: 15,
//                 }}>
//                 (0% off)
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         onEndReached={() => setShowSeeMore(true)}
//         onScroll={() => setShowSeeMore(false)}
//       />

//       {showSeeMore ? (
//         <TouchableOpacity
//           onPress={() => ShowTables()}
//           style={{alignSelf: 'center', marginVertical: 15}}>
//           <Text style={{fontSize: 18, fontWeight: 'bold', color: '#2E6BC6'}}>
//             See More
//           </Text>
//         </TouchableOpacity>
//       ) : null}
//     </View>
//   );
// };

// export default Products;



// import React from 'react'

// import { Text } from 'react-native'


// const Products = () => {
//   return (
// <>
// <Text> HII </Text>
// </>
//   )
// }

// export default Products




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { StarRatingDisplay } from 'react-native-star-rating-widget';

// const Products = (props) => {
//   const [output, setOutput] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [showSeeMore, setShowSeeMore] = useState(false);

//   async function ShowTables() {
//     try {
//       const accessToken = await AsyncStorage.getItem('access_token');
//       const result = await axios.get(
//         `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=1&page=${page}`,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       setOutput((prevOutput) => [...prevOutput, ...result.data.data]);
//       setPage((prevPage) => prevPage + 1);
//       setLoading(false);
//     } catch (error) {
//       console.log(error.response ? error.response.data : error.message);
//       Alert.alert('Error fetching data');
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     ShowTables();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => {
//         if (item.id === 1) {
//           props.navigation.navigate('TableDetails', { id: item.id });
//         } else if (item.id === 2) {
//           props.navigation.navigate('ChairDetails', { id: item.id });
//         }
//       }}
//       style={styles.itemContainer}
//     >
//       <Image style={styles.image} source={{ uri: item.product_images }} />
//       <View style={styles.infoContainer}>
//         <Text style={styles.title}>{item.name}</Text>
//         <Icon style={styles.icon} name="remove-red-eye" size={21} />
//         <Text style={styles.viewCount}>{`${(item.view_count * 0.5).toFixed(1)}k`}</Text>
//         {/* <StarRatingDisplay
//           style={styles.rating}
//           starSize={20}
//           rating={item.rating}
//         /> */}
//         <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
//           {item.description}
//         </Text>
//         <View style={styles.priceContainer}>
//           <Text style={styles.originalPrice}>{`₹${item.cost}`}</Text>
//           <Text style={styles.discountedPrice}>{`₹${item.cost}`}</Text>
//           <Text style={styles.discount}> (0% off)</Text>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           <FlatList
//             data={output}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//             onEndReached={() => setShowSeeMore(true)}
//             onScroll={() => setShowSeeMore(false)}
//             contentContainerStyle={styles.list}
//           />
//           {showSeeMore && (
//             <TouchableOpacity onPress={ShowTables} style={styles.seeMoreButton}>
//               <Text style={styles.seeMoreText}>See More</Text>
//             </TouchableOpacity>
//           )}
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   itemContainer: {
//     borderWidth: 1,
//     height: 380,
//     width: 350,
//     marginTop: 20,
//     alignSelf: 'center',
//     borderRadius: 12,
//     backgroundColor: 'white',
//     borderColor: '#ddd',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 4,
//   },
//   image: {
//     height: 150,
//     width: '100%',
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   infoContainer: {
//     padding: 10,
//   },
//   title: {
//     fontSize: 17,
//     color: 'black',
//     fontWeight: 'bold',
//     textAlign: 'left',
//   },
//   icon: {
//     paddingLeft: 50,
//   },
//   viewCount: {
//     fontSize: 14,
//     marginLeft: 5,
//     fontWeight: '600',
//   },
//   rating: {
//     alignSelf: 'center',
//     marginVertical: 5,
//   },
//   description: {
//     marginTop: 10,
//     fontSize: 16,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   originalPrice: {
//     color: '#A4A4A4',
//     textDecorationLine: 'line-through',
//     fontSize: 17,
//   },
//   discountedPrice: {
//     color: '#2E6BC6',
//     fontWeight: 'bold',
//     fontSize: 19,
//   },
//   discount: {
//     color: '#2E6BC6',
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   seeMoreButton: {
//     alignSelf: 'center',
//     marginVertical: 15,
//   },
//   seeMoreText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2E6BC6',
//   },
// });

// export default Products;





// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AirbnbRating } from 'react-native-ratings';

// const ProductList = ({ route, navigation }) => {
//   const productId = route?.params?.productId; // Access the productId
//   console.log("Product ID:", productId); // Check the value of productId
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showSeeMoreButton, setShowSeeMoreButton] = useState(false);
//   const [rating, setRating] = useState();

//   async function fetchProducts() {
//     try {
//       const accessToken = await AsyncStorage.getItem('access_token');
//       const response = await axios.get(
//         `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${productId}&page=${currentPage}`,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       setProducts((prevProducts) => [...prevProducts, ...response.data.data]);
//       setCurrentPage((prevPage) => prevPage + 1);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error.response ? error.response.data : error.message);
//       Alert.alert('Error fetching data');
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const renderProductItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => {
//         navigation.navigate('ProductDetails', { id: item.id });
//       }}
//       style={{
//         flexDirection: 'row',
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 12,
//         backgroundColor: 'white',
//         marginVertical: 10,
//         marginHorizontal: 16,
//         overflow: 'hidden',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 4,
//         padding: 10,
//       }}
//     >
//       <Image
//         style={{
//           height: 80,
//           width: 120,
//           borderRadius: 8,
//           marginRight: 10,
//         }}
//         source={{ uri: item.product_images }}
//       />
//       <View style={{ flex: 1 }}>
//         <Text>{item.producer}</Text>
//         <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
//           {item.name}
//         </Text>
//         <AirbnbRating
//           count={5}
//           defaultRating={rating}
//           onFinishRating={(rate) => setRating(rate)}
//           size={16}
//           showRating={false}
//         />
//         <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'baseline', marginTop: 10 }}>
//           <Text style={{ color: '#2E6BC6', fontWeight: 'bold', fontSize: 18 }}>
//             {`₹${item.cost}`}
//           </Text>
//           <Text style={{ color: '#A4A4A4', textDecorationLine: 'line-through', fontSize: 16, marginLeft: 10 }}>
//             {`₹${item.cost}`}
//           </Text>
//         </View>
//         <Text style={{ marginTop: 5, fontSize: 14, color: '#555' }} numberOfLines={1} ellipsizeMode="tail">
//           {item.description}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: 'white' }}>
//       {isLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           <FlatList
//             data={products}
//             renderItem={renderProductItem}
//             keyExtractor={(item) => item.id.toString()}
//             onEndReached={() => setShowSeeMoreButton(true)}
//             onScroll={() => setShowSeeMoreButton(false)}
//             contentContainerStyle={{ paddingBottom: 20 }}
//           />
//           {showSeeMoreButton && (
//             <TouchableOpacity onPress={fetchProducts} style={{ alignSelf: 'center', marginVertical: 15 }}>
//               <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#2E6BC6' }}>
//                 See More
//               </Text>
//             </TouchableOpacity>
//           )}
//         </>
//       )}
//     </View>
//   );
// };

// export default ProductList;



import React, { useEffect, useState } from 'react' 
import { ActivityIndicator, FlatList, Image, Text , TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import EyeIcon from 'react-native-vector-icons/Ionicons'
import { AirbnbRating } from 'react-native-ratings'


const ProductList = ({route , navigation}) => {
  const [productData,setProductData] = useState([])
  const [currentPage, SetCurrentPage] = useState(1)
  const [loading , setLoading] = useState(false)
  const [hasMore , setHasMore] = useState(true)
  // console.log(route.params)
  const productId = route?.params?.productId
  // console.log(productId)
 

  async function ProductLists() {

    if(!hasMore) return; 

    setLoading(true)
   try {
    const accessTokens = await AsyncStorage.getItem('access_token')
    // console.log(accessTokens)

    const response = await axios.get(
      `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${productId}&page=${currentPage}`

    )
    // console.log(response?.data.data)
    setProductData((prevData) => [...prevData , ...response?.data?.data] )
    setHasMore(response.data.data.length > 0)
    SetCurrentPage(currentPage+1)
    // console.log(productData.length)
   } catch (error) {
    console.log(error)

   } finally {
    setLoading(false)
   }
  }

  const renderProductData = ( {item} ) => {
    return (
    // console.log(item)
    <View style = {{ borderWidth: 0.75, margin: 10, borderRadius: 15 , flexDirection: "row" , overflow: 'hidden', alignItems: 'center'}}  >
      <TouchableOpacity style= {{flexDirection: 'row'}} onPress = {() => navigation.navigate('ProductInfo' , { productId: item.id})}>
     
    <Image source = {{uri: item.product_images}} style = {{height: 100, width: 150 , marginTop: 20, marginLeft: 10, marginRight: 10}} resizeMode='contain'/>
    {
        // console.log(item)
      } 
        <View style = {{flexDirection: 'column' , paddingTop: 5}}>
        <Text style = {{fontFamily: 'Laila-Regular'}}> { item.producer}</Text>
        <Text style = {{fontFamily: 'Laila-SemiBold'}}> { item.name}</Text>
        <View style = {{flexDirection: 'row'}}>
          <EyeIcon name='eye' size={20} color='black' />
        <Text> {item.view_count }</Text>
        </View>
        <View style = {{alignItems: 'flex-start'}}>
        <AirbnbRating 
        count = {5}
        defaultRating={item.rating}
        size={15}
        showRating={false}
        />
        </View>


        <View style = {{flexDirection: 'row' , alignContent: 'center'}}>
        <Text style = {{color: 'blue', fontSize: 16}}> ₹{ item.cost}</Text> 
        <Text style = {{textDecorationLine: 'line-through', fontSize: 14 , marginTop: 2, marginLeft: 5}}> ₹{ item.cost}</Text> 
        </View>

        <Text style = {{ width: 200, fontSize: 13 , marginBottom:15}}  numberOfLines={1} ellipsizeMode='tail'> { item.description}</Text>

        </View>

      </TouchableOpacity>
    </View>
    )
  }

  useEffect(()=>{
    ProductLists()

  },[])
  return (
    <View style = {{flex:1 , backgroundColor: 'white'}}>
    



      <View>
        <>
      <FlatList 
      data = {productData} 
      renderItem = {renderProductData}
      keyExtractor={(item) => item.id.toString() }
      ListFooterComponent={
        hasMore && (
          <TouchableOpacity onPress={ProductLists} > 
          {
            loading ? <ActivityIndicator /> : <Text style = {{textAlign: 'center', fontSize: 16, color: 'blue' , fontFamily: 'Laila-SemiBold'}}> Show More</Text>
          }
            </TouchableOpacity>
          
        )
      }
      
      
      />
      </>
      <Text>HII</Text>
      </View>



    </View>
  )
}

export default ProductList




