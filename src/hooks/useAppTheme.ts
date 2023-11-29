import { useAppSelector } from "@redux/store"
import { myColors } from "@utils"

export const useAppTheme = () => {
    const { colorTheme } = useAppSelector(state => state.userSlice)
    if (colorTheme == 'light') {
        return {
            ...myColors,
        }
    }

    return {
        ...myColors,
        background: '#242526',
        text: '#fffffff0',
        primary_60:'#7d373d',
        gray: '#313233',
        textHint: '#787878',
        itemCustom: '#303134',
        transparentWhite: '#3e3f40',
        special: '#692b30',
    }
}