import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PRIMARY_COLOR } from '../../utils/colors';
import { Font_Heebo_Regular } from '../../utils/typograpy';
import Icon from '../../utils/icons';
const Item = ({ status, count, isLast, title }) => {
    return (
        <View style={[styles.progress_item]}>
            <View
                style={
                    status === 'success'
                        ? styles.progress_item_check
                        : styles.progress_item_pending
                }>
                {status === 'success' ? (
                    <Icon
                        name={'checkmark-outline'}
                        size={20}
                        color={"#000"}
                    />
                ) : (
                    <Text style={styles.progressCount}>{count}</Text>
                )}
                {isLast ? null : (
                    <View
                        style={[
                            styles.progress_item_line,
                            { opacity: status === 'success' ? 1 : 0.3 },
                        ]}
                    />
                )}
            </View>
            <Text style={styles.progress_item_label}>{title}</Text>
        </View>
    );
};
export default function ProgressStrip({ status }) {
    return (
        <View style={styles.progress_strip}>
            <Item
                title={'Order Received'}
                status={"success"}
                count={'1'}
            />
            <Item
                title={'Order Confirm'}
                status={status=='shipped'||status=='confirm'?"success":''}
                count={'1'}
            />
            <Item
                title={'Order Shipped'}
                status={status=='shipped'?"success":''}
                count={'3'}
            />
            <Item
                title={'Delivered'}
                status={""}
                count={'4'}
                isLast
            />
        </View>
    );

}

const styles = StyleSheet.create({


    progress_strip: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    progress_item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
    },
    progress_item_check: {
        width: 30,
        height: 30,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    progress_item_pending: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#8E8E8E',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#fff',
    },
    progressCount: {
        color: '#8E8E8E',
        fontSize: 18,
        fontFamily: Font_Heebo_Regular,
    },
    progress_item_line: {
        width: 3,
        height: 25,
        backgroundColor: PRIMARY_COLOR,
        position: 'absolute',
        top: 30,
        zIndex: -1,
    },
    progress_item_label: {
        fontSize: 14,
        fontFamily: Font_Heebo_Regular,
        color: "#000",
        marginLeft: 16,
    },

    icon_small: {
        width: 34,
        height: 34,
        resizeMode: 'contain',
    },
})