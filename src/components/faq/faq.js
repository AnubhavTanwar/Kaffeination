import React, { useState } from 'react';
import {
    LayoutAnimation,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { Font_Heebo_Bold, Font_Heebo_Medium, Font_Heebo_SemiBold } from '../../utils/typograpy';
import Icon from '../../utils/icons';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

export default function CollapsibleHeader({ data, navigation, style }) {
    const [active, setActive] = useState(null);
    return (
        <ScrollView contentContainerStyle={[styles.container, { style }]}>
            {data?.map((x, i) => (
                <Item key={i} active={active} i={i} setActive={setActive} data={x} navigation={navigation} />
            ))}
        </ScrollView>
    );
}

function Item({ i, active, setActive, data, key, navigation, }) {
    const onPress = () => {
        LayoutAnimation.easeInEaseOut();
        setActive(i == active ? null : i);
    };
    const open = active == i;
    return (
        <TouchableOpacity style={styles.item} key={key} onPress={onPress} activeOpacity={1}>
            <View style={styles.row}>
                <Text style={styles.header_title}>{data?.question}</Text>
                <Icon
                    name={open ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={"#000"}
                />
            </View>
            {open && (
                <View style={{ paddingTop: 16, flex: 1 }}>
                    <Text key={key} style={styles.subItem} textBreakStrategy={'highQuality'}>{data?.answer}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
    },
    item: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#EBE9F0',
        overflow: 'hidden',
        paddingVertical: 16,
        marginBottom: 5,
    },
    subItem: {
        fontSize: 14,
        fontFamily: Font_Heebo_Medium,
        color: 'rgba(29,29,29,0.7)',
        lineHeight: 16.8,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header_title: {
        fontSize: 16,
        fontFamily: Font_Heebo_SemiBold,
        color: 'rgba(29,29,29,1)',
        paddingRight: 40,
        lineHeight: 19.2,
        flex: 1,
    },
    hyperlinkText: {
        color: '#000',
        fontSize: 14,
        fontFamily: Font_Heebo_Bold,
        textDecorationColor: '#000',
        textDecorationLine: "underline",

    }
});

// <Hyperlink onPress={() => redux.data == '' ? data.answer.includes('https://google.com') ?
//     Linking.openURL('https://google.com') : data.answer.includes('https://google.com') ?
//         Linking.openURL('https://google.com') : null
//     : data.answer.includes('https://here') ?
//         navigation.navigate('help', { user: redux.data }) : data.answer.includes('https://whatsapp') ?
//             Linking.openURL('https://wa.me/15551234567') : data.answer.includes('https://mail') ?
//                 Linking.openURL('mailto:new@meatigo.com') : navigation.navigate('order-history')}
//     linkStyle={styles.hyperlinkText}
//     linkText={url => url === 'https://order' ?
//         'My Order(s)' : url === 'https://here' ?
//             'here' : url === 'https://whatsapp' ?
//                 'Whatsapp' : url === 'https://mail' ?
//                     'new@meatigo.com' : url}
// >
//     <Text key={key} style={styles.subItem} textBreakStrategy={'highQuality'}>{data.answer}</Text>
// </Hyperlink>