// Weather condition mappings to animation types
export const getAnimationType = (condition) => {
    const conditionLower = condition.toLowerCase();

    // Sunny/Clear conditions
    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
        return 'sunny';
    }

    // Cloudy conditions
    if (conditionLower.includes('cloudy') || 
        conditionLower.includes('overcast') ||
        conditionLower.includes('partly')) {
        return 'cloudy';
    }

    // Rainy conditions
    if (conditionLower.includes('rain') || 
        conditionLower.includes('drizzle') ||
        conditionLower.includes('sleet') ||
        conditionLower.includes('shower')) {
        return 'rainy';
    }

    // Snowy conditions
    if (conditionLower.includes('snow') || 
        conditionLower.includes('blizzard') ||
        conditionLower.includes('ice pellets')) {
        return 'snowy';
    }

    // Thunder conditions
    if (conditionLower.includes('thunder')) {
        return 'thunder';
    }

    // Foggy/Misty conditions
    if (conditionLower.includes('mist') || 
        conditionLower.includes('fog')) {
        return 'foggy';
    }

    // Default to cloudy if no match is found
    return 'cloudy';
};

// Get animation component based on weather type
export const getAnimationComponent = (condition) => {
    const type = getAnimationType(condition);
    
    switch (type) {
        case 'sunny':
            return 'SunnyAnimation';
        case 'cloudy':
            return 'CloudyAnimation';
        case 'rainy':
            return 'RainyAnimation';
        case 'snowy':
            return 'SnowyAnimation';
        case 'thunder':
            return 'ThunderAnimation';
        case 'foggy':
            return 'FoggyAnimation';
        default:
            return 'CloudyAnimation';
    }
}; 