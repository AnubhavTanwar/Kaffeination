import React, { useState } from 'react';
import { Text, StyleSheet, View, Modal, TextInput, FlatList, SafeAreaView } from 'react-native';
import Icon from '../../utils/icons';
import { Font_Heebo_Medium, Font_Heebo_Regular, Font_Heebo_SemiBold, Font_Lato_Bold } from '../../utils/typograpy';
import { GRAY_COLOR, PLACEHOLDER_COLOR, PRIMARY_LIGHT_COLOR, SECONDARY_LIGHT_COLOR } from '../../utils/colors';
import Button from '../button/Button';
import { TouchableRipple } from 'react-native-paper';
import RadioButton from '../button/RadioButton'

// const FILTER_ITEM = ["Dairy Products", "Foods", "Vegetables", "Snacks", "Healthcare", "Others"];
const FILTER_ITEM = ["Popular", "Discount", "Price (Low to High)", "Price (High to Low)"];

export default function Filter({ isVisible, onClose, products, filterProducts }) {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products); // Initialize with the original products
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    const handleFilter = (item) => {
        if (selectedFilters.includes(item)) {
            setSelectedFilters(selectedFilters.filter((filter) => filter !== item));
        } else {
            setSelectedFilters([item]);
        }
    };


    const applyFilters = () => {
        let filteredData = [...products];

        if (selectedFilters.includes("Popular")) {
            filteredData.sort((a, b) => {
                // Sort in descending order of quantity (high quantity first)
                return b.quantity - a.quantity;
            });
        }
        if (selectedFilters.includes("Discount")) {
            // Apply discount filter logic
            filteredData.sort((a, b) => b.discount - a.discount);
          }
        
          if (selectedFilters.includes("Price (Low to High)")) {
            // Sort in ascending order of price (low price first)
            filteredData.sort((a, b) => a.price - b.price);
          }
        
          if (selectedFilters.includes("Price (High to Low)")) {
            // Sort in descending order of price (high price first)
            filteredData.sort((a, b) => b.price - a.price);
          }

          let priceFilteredData = [...filteredData]; // Create a copy of filteredData to apply the price range filter

          if (minPrice !== '' && maxPrice !== '') {
            priceFilteredData = priceFilteredData.filter(
              (product) => product.userPrice >= parseInt(minPrice) && product.userPrice <= parseInt(maxPrice)
            );
          }
        
          // Check if no filters applied, revert to original products list
          if (selectedFilters.length === 0 && minPrice === '' && maxPrice === '') {
            filteredData = [...products];
          } else {
            filteredData = priceFilteredData; // Update filteredData with the price range filtered data
          }
        

        setFilteredProducts(filteredData); // Update the filtered products state

        // Pass the filtered products back to the parent component or perform any other action
        console.log(filteredData, "filtered products");
        filterProducts(filteredData);
        // Close the modal after applying filters
        onClose && onClose();
    };

    const isFilterSelected = (item) => {
        return selectedFilters.includes(item);
    };

    const clearAllFilters = () => {
        setSelectedFilters([]);
        setMinPrice('');
        setMaxPrice('');
        filterProducts(products);
        setFilteredProducts(products); // Reset filtered products to the original list
    };
    return (
        <Modal visible={isVisible} onRequestClose={onClose && onClose} transparent animationType="slide">

            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: "rgba(0,0,0,0.2)" }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: "#fff", borderRadius: 10 }}>
                    <View style={styles.modalHeader}>
                        <Text style={{ fontSize: 22, fontFamily: Font_Lato_Bold, color: "#000" }}>Filter</Text>
                        <Icon name='close' size={25} onPress={onClose && onClose} />
                    </View>
                    <View style={{ padding: 14 }}>
                        <Text style={{ fontSize: 18, fontFamily: Font_Heebo_Medium, color: "#000" }}>Price Range</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingBottom: 0 }}>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    placeholder='Minimum'
                                    placeholderTextColor={PLACEHOLDER_COLOR}
                                    style={styles.textInput}
                                    value={minPrice}
                                    onChangeText={setMinPrice}
                                    keyboardType='numeric'
                                />
                            </View>
                            <View style={{ marginHorizontal: 14 }}>
                                <Text style={{ fontSize: 15, color: "#000", }}>-</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    placeholder='Maximum' 
                                    placeholderTextColor={PLACEHOLDER_COLOR} 
                                    style={styles.textInput} 
                                    value={maxPrice}
                                    onChangeText={setMaxPrice}
                                    keyboardType='numeric'
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.suHeadings}>
                        <Text style={{ fontSize: 18, fontFamily: Font_Heebo_Medium, color: "#000" }}>Categories</Text>
                        <TouchableRipple onPress={clearAllFilters} style={styles.clearAll}>
                            <Text style={{ fontSize: 12, fontFamily: Font_Heebo_Regular, color: "#000" }}>Clear All</Text>
                        </TouchableRipple>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={FILTER_ITEM} // Use FILTER_ITEM constant as the data source
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableRipple onPress={() => handleFilter(item)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: "rgba(240, 240, 240, 1)" }}>
                                    <React.Fragment>
                                        <Text style={{ fontSize: 16, fontFamily: Font_Heebo_SemiBold, color: "#000", lineHeight: 20 }}>{item}</Text>
                                        <RadioButton status={isFilterSelected(item)} onPress={() => handleFilter(item)} />
                                    </React.Fragment>
                                </TouchableRipple>
                            )}
                            keyExtractor={(item) => item._id}
                        />
                    </View>
                    <View style={{ padding: 14 }}>
                        <Button title="Apply" onPress={applyFilters} />
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalHeader: {
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(200,200,200,1)"
    },
    suHeadings: {
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GRAY_COLOR,
        paddingHorizontal: 14,
        borderRadius: 10,
        flex: 1
    },
    textInput: {
        textAlign: 'center',
        paddingVertical: 0,
        height: 50,
        fontFamily: Font_Heebo_Medium,
        fontSize: 15,
        flex: 1
    },
    clearAll: {
        backgroundColor: SECONDARY_LIGHT_COLOR,
        paddingHorizontal: 14,
        paddingVertical: 3,
        borderRadius: 15,
    },
});