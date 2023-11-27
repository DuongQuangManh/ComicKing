import { useAppSelector } from "@redux/store"
import { myColors } from "@utils"

export const useAppTheme = () => {
    const {colorTheme} = useAppSelector(state => state.userSlice)
    if(colorTheme == 'light'){
        return {
            ...myColors,
            textHint: 'red'
        }
    }

    return {
        ...myColors,
        background: '#242526',
        text: '#fffffff0',
        textHint: 'red'
    }
}