import { Text, View } from "react-native"
import { Font_Heebo_Medium } from "../../utils/typograpy"

export const NewTag = () => {
    return <View style={{ alignItems: 'flex-start' }}>
        <View style={{ zIndex: 1, backgroundColor: "#FF6400", paddingHorizontal: 4, paddingVertical: 2, }}>
            <Text style={{ fontSize: 11, color: "#fff", fontFamily: Font_Heebo_Medium }}>New</Text>
        </View>
    </View>
}
export const BestTag = () => {
    return <View style={{ alignItems: 'flex-start' }}>
        <View style={{ zIndex: 1, backgroundColor: "#FF6400", paddingHorizontal: 4, paddingVertical: 2, }}>
            <Text style={{ fontSize: 11, color: "#fff", fontFamily: Font_Heebo_Medium }}>Bestseller</Text>
        </View>
    </View>
}