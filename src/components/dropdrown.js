import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const CustomDropdown = ({ items, placeholder, onSelect }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => {
        setIsVisible(!isVisible);
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
        onSelect(item); 
        setIsVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
                <Text style={styles.dropdownText}>
                    {selectedItem ? selectedItem.label : placeholder}
                </Text>
            </TouchableOpacity>

            <Modal transparent={true} visible={isVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={items}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.item}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={toggleDropdown}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,

        marginTop:1
    },
    dropdown: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
    },
    dropdownText: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Laila-Light'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CustomDropdown;