import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'
import { Styleheet } from 'react-native/types'
import { G, Path, Svg } from 'react-native-svg'
/**
 * 
 * @param {{ 
 * type: "fontAwesome" | "fontAwesome5" | "fontAwesome5Pro" | "antDesign" | "entypo" | "evilIcons" | "feather" | "fontisto" | "foundation" | "ionicons" | "materialCommunityIcons" | "materialIcons" | "octicons" | "simpleLineIcons" | "zocial",
 * name:string,
 * color:string,
 * size:number,
 * onPress:Function,
 *  style: object
 * }} props Props for the component
 * 
 */
const Icon = ({ type, name, color = "#000", size = 16, onPress, style }) => {
    switch (type) {
        case "fontAwesome":
            return <FontAwesome style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "fontAwesome5":
            return <FontAwesome5 style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "fontAwesome5Pro":
            return <FontAwesome5Pro style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "antDesign":
            return <AntDesign style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "entypo":
            return <Entypo style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "EvilIcons":
            return <EvilIcons style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "feather":
            return <Feather style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "fontisto":
            return <Fontisto style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "foundation":
            return <Foundation style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "ionicons":
            return <Ionicons style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "materialCommunityIcons":
            <MaterialCommunityIcons style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "materialIcons":
            return <MaterialIcons style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "octicons":
            return <Octicons style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "simpleLineIcons":
            return <SimpleLineIcons style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        case "zocial":
            return <Zocial style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
        default:
            return <Ionicons style={style} name={name} color={color} size={size} onPress={onPress && onPress} />;
    }
}
export default Icon


export const OfferIcon = (props) => {
    return (<Svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{
            enableBackground: "new 0 0 512 512",
        }}
        xmlSpace="preserve"
        {...props}
    >
        <G>
            <Path {...props} d="M197,350.7L350.7,197c10-10,10-26.2,0-36.2c-10-10-26.2-10-36.2,0L160.8,314.5c-10,10-10,26.2,0,36.2S187,360.7,197,350.7" />
            <Path {...props} d="M191.7,178.9v25.6v-12.8l-12.8,0c0,7.1,5.7,12.8,12.8,12.8v-12.8l-12.8,0h12.8V178.9c-7.1,0-12.8,5.7-12.8,12.8h12.8V178.9 v12.8h12.8C204.5,184.7,198.8,178.9,191.7,178.9v12.8h12.8h-12.8v12.8c7.1,0,12.8-5.7,12.8-12.8h-12.8v12.8V178.9v-25.6 c-21.2,0-38.4,17.2-38.4,38.4c0,21.2,17.2,38.4,38.4,38.4s38.4-17.2,38.4-38.4c0-21.2-17.2-38.4-38.4-38.4V178.9z" />
            <Path  {...props} d="M319.8,307v25.6v-12.8l-12.8,0c0,7.1,5.7,12.8,12.8,12.8v-12.8l-12.8,0h12.8V307c-7.1,0-12.8,5.7-12.8,12.8h12.8V307v12.8 h12.8C332.6,312.7,326.8,307,319.8,307v12.8h12.8h-12.8l0,12.8c7.1,0,12.8-5.7,12.8-12.8h-12.8l0,12.8V307v-25.6 c-21.2,0-38.4,17.2-38.4,38.4c0,21.2,17.2,38.4,38.4,38.4c21.2,0,38.4-17.2,38.4-38.4c0-21.2-17.2-38.4-38.4-38.4V307z" />
            <Path  {...props} d="M102.1,132.9c0-17,13.8-30.7,30.7-30.7l25.6,0l0,0c21.6,0,42.4-8.6,57.7-23.8l0,0l17.9-17.9l0.1-0.1 c6.1-6.1,13.8-9,21.8-9.1c7.9,0,15.6,2.9,21.7,8.9l0,0l0.2,0.2l0,0l17.9,17.9l0,0c15.3,15.3,36.1,23.8,57.7,23.8l0,0h25.6 c17,0,30.7,13.8,30.7,30.7v25.6c0,21.6,8.6,42.4,23.8,57.7l0,0l17.9,17.9l0.1,0.1c6.1,6.1,9,13.8,9.1,21.8c0,7.9-2.9,15.6-8.9,21.7 l0,0l-0.2,0.2l0,0l-17.9,17.9l0,0c-15.3,15.3-23.8,36.1-23.8,57.7v25.6c0,17-13.8,30.7-30.7,30.7h-25.6h0 c-21.6,0-42.4,8.6-57.7,23.8l0,0l-17.9,17.9l-0.1,0.1c-6.1,6.1-13.8,9-21.8,9.1c-7.9,0-15.6-2.9-21.7-8.9l0,0l-0.2-0.2l0,0 l-17.9-17.9l0,0c-15.3-15.3-36.1-23.8-57.7-23.8h0h-25.6c-17,0-30.7-13.8-30.7-30.7l0-25.6c0-21.6-8.6-42.4-23.8-57.7l0,0 l-17.9-17.9l-0.1-0.1c-6.1-6.1-9-13.8-9.1-21.8c0-7.9,2.9-15.6,8.9-21.7l0,0l0.2-0.2l0,0l17.9-17.9l0,0 c15.3-15.3,23.8-36.1,23.8-57.7V132.9c0-14.1-11.5-25.6-25.6-25.6c-14.1,0-25.6,11.5-25.6,25.6v25.6c0,8.1-3.2,15.9-8.9,21.6l0,0 L24.1,198l0,0l-0.2,0.2l0,0C8,214.1,0,235.2,0,256c0,21,8.1,42.2,24.2,58.1l-0.1-0.1L42,332l0,0c5.7,5.8,8.9,13.5,8.9,21.7v25.6 c0,45.3,36.7,81.9,81.9,81.9l25.6,0l0,0c8.1,0,15.9,3.2,21.7,8.9l0,0l17.9,17.9l0,0l0.2,0.2l0,0c15.9,15.8,37,23.9,57.8,23.8 c21,0,42.2-8.1,58.1-24.2l-0.1,0.1L332,470l0,0c5.8-5.7,13.5-8.9,21.7-8.9l0,0h25.6c45.3,0,81.9-36.7,81.9-81.9v-25.6 c0-8.1,3.2-15.9,8.9-21.6l0,0l17.9-17.9l0,0l0.2-0.2l0,0c15.9-15.9,23.9-37,23.8-57.8c0-21-8.1-42.2-24.2-58.1l0.1,0.1L470,180l0,0 c-5.7-5.8-8.9-13.5-8.9-21.7v-25.6c0-45.3-36.7-81.9-81.9-81.9h-25.6h0c-8.1,0-15.9-3.2-21.7-8.9l0,0L314,24.1l0,0l-0.2-0.2l0,0 C297.9,8,276.8,0,256,0c-21,0-42.2,8.1-58.1,24.2l0.1-0.1L180,42l0,0c-5.8,5.7-13.5,8.9-21.7,8.9h0h-25.6 c-45.3,0-81.9,36.7-81.9,81.9c0,14.1,11.5,25.6,25.6,25.6C90.7,158.5,102.1,147,102.1,132.9L102.1,132.9z" />
        </G>
    </Svg>)
}