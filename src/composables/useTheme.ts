import { Storage } from '@capacitor/storage';
import { ref, watch, computed } from 'vue';

const LIGHT_THEME_KEY = 'light';
const DARK_THEME_KEY = 'dark';

const THEME_KEY = 'current_theme';

const theme = ref(LIGHT_THEME_KEY);

const cacheTheme = () => {
    Storage.set({
        key: THEME_KEY,
        value: theme.value,
    });
};

watch(theme, cacheTheme);

export function useTheme () {
    
    const isDarkTheme = computed(() => theme.value == DARK_THEME_KEY);

    const changeTheme = (wanted_theme: string|null = null) => {
        if (wanted_theme === LIGHT_THEME_KEY || wanted_theme === DARK_THEME_KEY) {
            theme.value = wanted_theme;
        } else {
            theme.value = theme.value === LIGHT_THEME_KEY ? DARK_THEME_KEY : LIGHT_THEME_KEY;
        }
        
        document.body.classList.toggle('dark', isDarkTheme.value);
    };
    
    const loadTheme = async () => {
        const loadedTheme = await Storage.get({ key: THEME_KEY }); 
        theme.value = loadedTheme.value ? loadedTheme.value : LIGHT_THEME_KEY;
        
        changeTheme(theme.value);
    };

    return { 
        loadTheme,
        changeTheme,
        isDarkTheme, 
    };
}