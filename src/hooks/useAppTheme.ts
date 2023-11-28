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
        primary_60:'#737373',
        gray:'#18191a',
        textHint: '#414245',
        itemCustom: '#303134'
    }
}