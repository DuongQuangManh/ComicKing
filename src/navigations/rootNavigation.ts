import { StackActions, createNavigationContainerRef } from '@react-navigation/native';
import { StackParamList, ScreensName } from '@navigations';

export const navigationRef = createNavigationContainerRef<StackParamList>()

export const navigate = (name: ScreensName, params?: StackParamList[typeof name]) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name as any, params as any);
    }
}
export const push = (name: ScreensName, params?: StackParamList[typeof name]) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.push(name, params as any));
    }
}

export const reset = (routes: { name: ScreensName, params?: any }[], index: number = 0) => {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index,
            routes: routes
        })
    }
}
export const replace = (name: ScreensName, params?: any) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params))
    }
}

export const goBack = (time: number | any = 1) => {
    if (typeof time != 'number') time = 1
    while (--time >= 0) {
        if (navigationRef.isReady()) {
            if (!navigationRef.canGoBack()) return
            navigationRef.dispatch(StackActions.pop())
        }
    }
}

export const getCurrentRouter = () => {
    return navigationRef.getCurrentRoute()?.name as ScreensName
}