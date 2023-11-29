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
        background: '#000000',
        text: '#ffffffff',
        primary_60:'#7d373d',
        gray: '#383838',
        textHint: '#807e7e',
        itemCustom: '#303134',
        transparentWhite: '#4c4c4c',
        special: '#692b30',
    }
}