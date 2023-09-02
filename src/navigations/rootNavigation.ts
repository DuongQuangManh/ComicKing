import { StackActions, createNavigationContainerRef } from '@react-navigation/native';
import { TStackParamList, TScreensName } from './params.type';

export const navigationRef = createNavigationContainerRef<TStackParamList>()

export function navigate(name: TScreensName, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

export function reset(index: number, routes: { name: TScreensName }[]) {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index,
            routes: routes
        })
    }
}
export function replace(name: TScreensName, params: any) {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}

export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.pop());
    }
}

export const getCurrentRouter = () => {
    return navigationRef.getCurrentRoute()
}