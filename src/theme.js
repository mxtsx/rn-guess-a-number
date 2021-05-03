import {Dimensions} from "react-native";

export const THEME = {
    MAIN_COLOR: "#6d6875",
    PRIMARY_COLOR: "#b5838d",
    DANGER_COLOR: "#e5989b",
    MARGIN_PADDING_10: Dimensions.get('window').height / 50,
    SMALL_DEVICE: Dimensions.get('window').width < 350
}